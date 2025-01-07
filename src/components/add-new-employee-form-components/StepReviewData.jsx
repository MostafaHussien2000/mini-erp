import React from "react";
import SwitchButton from "../../ui/SwitchButton";

function StepReviewData({ methods }) {
  return (
    <section>
      <div className="preview-section">
        <h2>Summary</h2>
        <table>
          <tbody>
            <tr>
              <td className="field-name">Employee</td>
              <td className="with-image">
                <img src={methods.watch().base64} alt={methods.watch().name} />
                <span>{methods.watch().name}</span>
              </td>
            </tr>
            <tr>
              <td className="field-name">Role</td>
              <td>{methods.watch().role}</td>
            </tr>
            <tr>
              <td className="field-name">E-Mail</td>
              <td>{methods.watch().email}</td>
            </tr>
            <tr>
              <td className="field-name">Phone</td>
              <td>{methods.watch().phone}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="preview-section double">
        <div className="preview-section">
          <h2>Date</h2>
          <table>
            <tbody>
              <tr>
                <td className="field-name">Start Date</td>
                <td>{methods.watch().startDate}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="preview-section">
          <h2>Active</h2>
          <table>
            <tbody>
              <tr>
                <td className="field-name">Active Status</td>
                <td>
                  <SwitchButton
                    inputName={"activeStatus"}
                    extra={methods.register("activeStatus")}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default StepReviewData;
