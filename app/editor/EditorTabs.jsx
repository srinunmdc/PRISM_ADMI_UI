import React from "react";
import { inject, observer } from "mobx-react";
import Editor from "./Editor";
import Tab from "./Tab";
import AlertTemplateResourceStore from "../store/AlertTemplateStore";

@inject("alertTemplateStore")
@observer
class EditorTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      baseUrl: `${window.location.protocol  }//${  window.location.host}`,
      template: null,
      activeTab: ""
    };
  }

  onClickTabItem(tab) {
    AlertTemplateResourceStore.setSelectedContentType(tab);
  }

  render() {
    const { alertTemplateStore } = this.props;
    const activeTab = alertTemplateStore.templateContentTypes.selected;

    return (
      <div className="tabs">
        <ul className="tab-list">
          {alertTemplateStore.templateContentTypes.options &&
            alertTemplateStore.templateContentTypes.options.map(element => {
              const label = element;

              return (
                <Tab
                  activeTab={activeTab}
                  key={label}
                  label={label}
                  onClick={this.onClickTabItem.bind(this)}
                />
              );
            })}
        </ul>

        <div className="tab-content">
          {alertTemplateStore.alertTemplates.map(element => {
            if (element.templateContentType !== activeTab) return undefined;
            return <Editor data={element} />;
          })}
        </div>
      </div>
    );
  }
}

export default EditorTabs;
