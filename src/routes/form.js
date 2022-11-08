import { useEffect, useState } from "react";
import { Input, Form, Button, Pagination, Radio, Space } from "antd";
import { Divider } from "antd";
import { getQuestions, saveData } from "../services/dataFetching";
import "./../css/form.scss";
import { useNavigate } from "react-router-dom";

export default function Formx() {
  const [current, setCurrent] = useState(1);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [submitButtonClass, setSubmitButtonClass] = useState("hide");
  const [isPaginationDisabled, setIsPaginationDisabled] = useState(true);
  const [showLoader, setShowLoader] = useState(true);
  // const [formInstance] = Form.useForm();
  const navigate = useNavigate();

  const defaultQuestions = [
    {
      question: "What's your name?",
      question_type: "text",
    },
    {
      question: "What's your email?",
      question_type: "text",
    },
  ];

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    getQuestions().then((data) => {
      data = data.map((question) => {
        return Object.assign(
          { question_type: "radio", values: ["radio", "nope"] },
          question
        );
      });
      setQuestions(defaultQuestions.concat(data));
      setQuestion(defaultQuestions[0]);
      setShowLoader(false);
    });
  }, []);

  const pageChanged = (page, pageSize) => {
    setQuestion(questions[page - 1]);
    setAnswer(questions[page - 1].answer);
    enableSubmitButtonWithPage(page);
    setCurrent(page);
    disablePaginatorWithPage(page);
  };

  const enableSubmitButtonWithPage = (page) => {
    if (page === questions.length && questions[page - 1].answer !== undefined)
      setSubmitButtonClass("");
    else setSubmitButtonClass("hide");
  };

  const enableSubmitButton = () => {
    if (
      current === questions.length &&
      questions[current - 1].answer.toString() !== ""
    )
      setSubmitButtonClass("");
    else setSubmitButtonClass("hide");
  };

  const textQuestionChanged = (e) => {
    questions[current - 1].answer = e.target.value;
    setAnswer(e.target.value);
    disablePaginator();
    enableSubmitButton();
  };

  const radioQuestionChanged = (e) => {
    questions[current - 1].answer = e.target.value;
    setAnswer(e.target.value);
    disablePaginator();
    enableSubmitButton();
  };

  const submit = async () => {
    setShowLoader(true);
    await saveData(questions);
    navigate("/data-sent");
  };

  const disablePaginator = () => {
    if (questions[current - 1].answer.toString() == "")
      setIsPaginationDisabled(true);
    else setIsPaginationDisabled(false);
  };

  const disablePaginatorWithPage = (page) => {
    if (
      questions[page - 1].answer == undefined ||
      questions[page - 1].answer == ""
    )
      setIsPaginationDisabled(true);
    else setIsPaginationDisabled(false);
  };

  const formJSX = () => {
    return (
      <div className="flex-center" style={{ height: "100%" }}>
        <h1>Collecting your data!</h1>
        <br></br>
        <br></br>
        <br></br>
        <Form
          // form={formInstance}
          name="basic"
          layout="vertical"
          autoComplete="off"
          style={{ width: "30%" }}
        >
          <Form.Item
            label={question.question}
            // name="question"
            // rules={[{ required: true, message: "Input an answer!" }]}
          >
            <Divider />
            {question.question_type === "radio" ? (
              <Radio.Group onChange={radioQuestionChanged} value={answer}>
                <Space direction="vertical">
                  {question.values.map((value, index) => (
                    <Radio key={index + 1} value={index + 1}>
                      {value}
                    </Radio>
                  ))}
                </Space>
              </Radio.Group>
            ) : (
              <Input
                placeholder="Answer here..."
                value={answer}
                onChange={textQuestionChanged}
              />
            )}
          </Form.Item>
          <div className="flex-center">
            <Pagination
              defaultCurrent={current}
              total={questions.length * 10}
              showSizeChanger={false}
              onChange={pageChanged}
              disabled={isPaginationDisabled}
            />
          </div>
          <br></br>
          <br></br>
          <Form.Item className={submitButtonClass}>
            <Button
              className="submit-button"
              type="primary"
              htmlType="submit"
              onClick={submit}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  };

  const loaderJSX = () => {
    return (
      <div className="flex-center" style={{ height: "100%" }}>
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  };

  return showLoader ? loaderJSX() : formJSX();
}
