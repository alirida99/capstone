import React from "react";
import styles from "./Taskstyle.module.scss";
/*import 'bootstrap/dist/css/bootstrap.min.css'; npm install bootstrap 5 , npm install jquery popper.js
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';*/
import DeleteIcon from "@mui/icons-material/Clear";

const FillList = (props) => {
  return props.taskList.map((val, idx) => {
    let sentence1 = `sentence1-${idx}`,
      sentence2 = `sentence2-${idx}`,
      answer = `answer-${idx}`;

    return (
      <>
        <div>
          <table className={styles.table} key={val.index}>
            <tr className={styles.labels && styles.tr}>
              <th className={styles.th}>First Sentence:</th>
              <th className={styles.th}>Correct Answer</th>
              <th className={styles.th}>Second Sentence:</th>
            </tr>
            <tr className={styles.tr}>
              <td>
                <textarea
                  className={styles.textarea}
                  placeholder="Enter first sentence"
                  name="sentence1"
                  data-id={idx}
                  id={sentence1}
                ></textarea>
              </td>
              <td>
                <textarea
                  className={styles.textarea}
                  type="text"
                  placeholder="Correct Answer"
                  name="answer"
                  id={answer}
                  data-id={idx}
                ></textarea>
              </td>
              <td>
                <textarea
                  className={styles.textarea}
                  placeholder="Enter second sentence"
                  name="sentence2"
                  data-id={idx}
                  id={sentence2}
                ></textarea>
              </td>
            </tr>
          </table>
          <button className={styles.delete} onClick={() => props.delete(val)}>
            <DeleteIcon />
          </button>
        </div>
      </>
      /*idx === 0 ? <button onClick={() => props.add()} type="button">Add icon </button>
          : <button className="btn btn-danger" onClick={(() => props.delete(val))} >Delete icon </button>*/
    );
  });
};
export default FillList;

export const McqList = (props) => {
  return props.mcqList.map((vall, idxx) => {
    let question = `question-${idxx}`,
      answer = `answer-${idxx}`,
      option1 = `option1-${idxx}`,
      option2 = `option2-${idxx}`,
      option3 = `option3-${idxx}`,
      option4 = `option4-${idxx}`;
    return (
      <>
        <div>
          <table className={styles.table} key={vall.index}>
            <tr className={styles.labels && styles.tr}>
              <th className={styles.th}>Question:</th>
              <th className={styles.th}>Correct Answer</th>
            </tr>
            <tr className={styles.tr}>
              <td>
                <textarea
                  className={styles.textarea}
                  placeholder="Enter Question"
                  name="question"
                  data-id={idxx}
                  id={question}
                ></textarea>
              </td>
              <td>
                <textarea
                  className={styles.textarea}
                  placeholder="Correct Answer"
                  name="answer"
                  id={answer}
                  data-id={idxx}
                ></textarea>
              </td>
            </tr>
            <tr className={styles.tr}>
              <td>
                <input
                  type="text"
                  className={styles.textfields}
                  placeholder="Option1"
                  name="option1"
                  id={option1}
                  data-id={idxx}
                />
              </td>
              <td>
                <input
                  type="text"
                  className={styles.textfields}
                  placeholder="Option2"
                  name="option2"
                  id={option2}
                  data-id={idxx}
                />
              </td>
            </tr>
            <tr className={styles.tr}>
              <td>
                <input
                  type="text"
                  className={styles.textfields}
                  placeholder="Option3"
                  name="option3"
                  id={option3}
                  data-id={idxx}
                />
              </td>
              <td>
                <input
                  type="text"
                  className={styles.textfields}
                  placeholder="Option4"
                  name="option4"
                  id={option4}
                  data-id={idxx}
                />
              </td>
            </tr>

            {/*idxx === 0 ? <button onClick={() => props.add1()} type="button">Add icon </button>
              : <button onClick={(() => props.delete1(vall))} >Delete icon </button>*/}
          </table>
          <button className={styles.delete} onClick={() => props.delete1(vall)}>
            <DeleteIcon />
          </button>
        </div>
      </>
    );
  });
};

export const DragDropList = (props) => {
  return props.dragdropList.map((valll, iddx) => {
    let before = `before-${iddx}`,
      after = `after-${iddx}`,
      answer = `answer-${iddx}`,
      option1 = `option1-${iddx}`,
      option2 = `option2-${iddx}`,
      option3 = `option3-${iddx}`;
    return (
      <>
        <div>
          <table className={styles.table} key={valll.index}>
            <tr className={styles.labels && styles.tr}>
              <th className={styles.th}>Before answer</th>
              <th className={styles.th}>After answer</th>
              <th className={styles.th}>Correct answer</th>
            </tr>
            <tr className={styles.tr}>
              <td>
                <textarea
                  className={styles.textarea}
                  placeholder="Sentence before drag/drop"
                  name="before"
                  data-id={iddx}
                  id={before}
                ></textarea>
              </td>
              <td>
                <textarea
                  className={styles.textarea}
                  placeholder="Sentence after drag/drop"
                  name="after"
                  data-id={iddx}
                  id={after}
                ></textarea>
              </td>
              <td>
                <textarea
                  className={styles.textarea}
                  placeholder="Correct Answer"
                  name="answer"
                  id={answer}
                  data-id={iddx}
                ></textarea>
              </td>
            </tr>
            <tr className={styles.tr}>
              <td>
                <input
                  type="text"
                  className={styles.textfields}
                  placeholder="Option1"
                  name="option1"
                  id={option1}
                  data-id={iddx}
                />
              </td>
              <td>
                <input
                  type="text"
                  className={styles.textfields}
                  placeholder="Option2"
                  name="option2"
                  id={option2}
                  data-id={iddx}
                />
              </td>
              <td>
                <input
                  type="text"
                  className={styles.textfields}
                  placeholder="Option3"
                  name="option3"
                  id={option3}
                  data-id={iddx}
                />
              </td>
            </tr>

            {/*iddx === 0 ? <button onClick={() => props.add2()} type="button">Add icon </button>
              : <button onClick={(() => props.delete2(valll))} >Delete icon </button>*/}
          </table>
          <button
            className={styles.delete}
            onClick={() => props.delete2(valll)}
          >
            <DeleteIcon />{" "}
          </button>
        </div>
      </>
    );
  });
};
