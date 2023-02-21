import React from "react";
import { McqList, DragDropList } from "./TaskList";
import FillList from "./TaskList";
import styles from "./Taskstyle.module.scss";
import AddBoxIcon from "@mui/icons-material/AddBox";

import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import AdminsHomeComponent from "../home";
import { Box } from "@mui/material";

export default class ExercisesForm extends React.Component {
  state = {
    taskList: [
      { index: Math.random(), sentence1: "", sentence2: "", answer: "" },
    ],
    mcqList: [
      {
        index: Math.random(),
        question: "",
        answer: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
      },
    ],
    dragdropList: [
      {
        index: Math.random(),
        before: "",
        after: "",
        answer: "",
        option1: "",
        option2: "",
        option3: "",
      },
    ],
    examTitle: "",
    time: "",
  };

  handleChange = (e) => {
    if (["sentence1", "sentence2", "answer"].includes(e.target.name)) {
      let taskList = [...this.state.taskList];
      taskList[e.target.dataset.id][e.target.name] = e.target.value;
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
    if (
      [
        "question",
        "answer",
        "option1",
        "option2",
        "option3",
        "option4",
      ].includes(e.target.name)
    ) {
      let mcqList = [...this.state.mcqList];
      mcqList[e.target.dataset.id][e.target.name] = e.target.value;
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
    if (
      ["before", "after", "answer", "option1", "option2", "option3"].includes(
        e.target.name
      )
    ) {
      let dragdropList = [...this.state.dragdropList];
      dragdropList[e.target.dataset.id][e.target.name] = e.target.value;
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };

  addNewfill = () => {
    this.setState((prevState) => ({
      taskList: [
        ...prevState.taskList,
        { index: Math.random(), sentence1: "", sentence2: "", answer: "" },
      ],
    }));
  };
  addNewMCQ = () => {
    this.setState((prevState) => ({
      mcqList: [
        ...prevState.mcqList,
        {
          index: Math.random(),
          question: "",
          answer: "",
          option1: "",
          option2: "",
          option3: "",
          option4: "",
        },
      ],
    }));
  };
  addNewDragDrop = () => {
    this.setState((prevState) => ({
      dragdropList: [
        ...prevState.dragdropList,
        {
          index: Math.random(),
          before: "",
          after: "",
          answer: "",
          option1: "",
          option2: "",
          option3: "",
        },
      ],
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.examTitle === "" || this.state.time === "") {
      NotificationManager.warning(
        "Please fill up the title, and time required for this exam!"
      );
      return false;
    }

    for (var i = 0; i < this.state.taskList.length; i++) {
      if (
        this.state.taskList[i].projectName === "" ||
        this.state.taskList[i].task === ""
      ) {
        NotificationManager.warning(
          "Please Fill up Required Field.Please Check Project name And Task Field"
        );
        return false;
      }
    }
    let data = { formData: this.state, userData: localStorage.getItem("user") };
  };
  clickOnDelete(record) {
    this.setState({
      taskList: this.state.taskList.filter((r) => r !== record),
      mcqList: this.state.mcqList.filter((r) => r !== record),
      dragdropList: this.state.dragdropList.filter((r) => r !== record),
    });
  }

  render() {
    let { taskList } = this.state;
    let { mcqList } = this.state;
    let { dragdropList } = this.state;
    return (
      <Box>
        <AdminsHomeComponent />
        <div className={styles.container}>
          <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
            <div className={styles.title}> Create Exam </div>
            <table className={styles.table}>
              <tr className={styles.labels && styles.tr}>
                <th className={styles.th}>Title </th>

                <th className={styles.th}> Time </th>
              </tr>
              <tr className={styles.tr}>
                <td>
                  {" "}
                  <input
                    className={styles.textfields}
                    type="text"
                    name="examTitle"
                    id="examTitle"
                    placeholder="Enter the title "
                  />
                </td>

                <td>
                  {" "}
                  <input
                    className={styles.textfields}
                    type="text"
                    name="time"
                    id="time"
                    placeholder="Enter time per minutes "
                  />
                </td>
              </tr>
            </table>
            <br />

            <div>
              {this.addNewfill && (
                <div>
                  <div className={styles.titlelabel}>
                    Fill in the Blank Question
                  </div>
                  <FillList
                    add={this.addNewfill}
                    delete={this.clickOnDelete.bind(this)}
                    taskList={taskList}
                  />
                </div>
              )}
              <br />
              {this.addNewMCQ && (
                <div>
                  <div className={styles.titlelabel}>MCQ Question</div>
                  <McqList
                    add1={this.addNewMCQ}
                    delete1={this.clickOnDelete.bind(this)}
                    mcqList={mcqList}
                  />
                </div>
              )}
              <br />
              {this.addNewDragDrop && (
                <div>
                  <div className={styles.titlelabel}>Drag & Drop Question</div>
                  <DragDropList
                    add2={this.addNewDragDrop}
                    delete2={this.clickOnDelete.bind(this)}
                    dragdropList={dragdropList}
                  />
                  <br />
                  <br />
                </div>
              )}
            </div>

            <button
              className={styles.buttongroup}
              onClick={this.addNewfill}
              type="button"
            >
              <AddBoxIcon /> Fill in blank{" "}
            </button>
            <button
              className={styles.buttongroup}
              onClick={this.addNewMCQ}
              type="button"
            >
              <AddBoxIcon /> MCQ{" "}
            </button>
            <button
              className={styles.buttongroup}
              onClick={this.addNewDragDrop}
              type="button"
            >
              <AddBoxIcon /> Drag & Drop{" "}
            </button>
            <br />
            <br />
            <NotificationContainer className={styles.notification} />
            <br />

            <div>
              {" "}
              <br />
              <button
                className={styles.saveform}
                type="submit"
                onClick={this.handleSubmit}
              >
                Create Exam
              </button>
            </div>
          </form>
        </div>
      </Box>
    );
  }
}
// export default ExercisesForm;
