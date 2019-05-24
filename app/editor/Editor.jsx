import React from "react";
import PropTypes from "prop-types";
import { inject } from "mobx-react";
import CKEditor from "./NewCKEditor";
import replaceDynamicVariable from "../util/replaceDynamicVariable";
import EditorControl from "./EditorControl";

@inject("alertPermissionStore")
class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: "75%"
    };
  }

  // eslint-disable-next-line react/sort-comp
  render() {
    const { height } = this.state;
    const {
      data,
      editMode,
      onChange,
      activeTab,
      dynamicVariables,
      edited,
      onPublish,
      onReject,
      onDraft,
      onCancel,
      onPreview,
      onClickEdit,
      alertPermissionStore
    } = this.props;
    const previewDivStyle = {
      height,
      border: "1px solid #d1d1d1",
      overflow: "auto",
      padding: "15px"
    };
    const commonRemove =
      "PasteText,PasteFromWord,Indent,Outdent,Scayt,Link,Unlink,Anchor,Image,Table,HorizontalRule,SpecialChar,Maximize,Strike,RemoveFormat,NumberedList,BulletedList,Blockquote,Styles,About,Subscript,Superscript";
    let extra = "";
    if (activeTab === "PUSH_BODY" || activeTab === "SMS_BODY") {
      extra = ",Bold,Italic,Underline,Format";
    }
    const finalRemove = commonRemove + extra;
    return (
      <div className="col-md-12 col-sm-12 col-xs-12 editor-preview-wrapper">
        {editMode[activeTab] ? (
          <div className="col-md-10 col-sm-10 col-xs-12">
            <CKEditor
              activeClass="p10"
              content={data.changedContent}
              events={{
                change: onChange
              }}
              config={{
                language: data.locale,
                height,
                removePlugins: "resize",
                toolbarCanCollapse: true,
                allowedContent: true,
                disableAutoInline: true,
                forcePasteAsPlainText: true,
                removeButtons: finalRemove
              }}
            />
          </div>
        ) : (
          <React.Fragment>
            <div className="col-md-10 col-sm-10 col-xs-12 preview-header">
              Preview
            </div>
            <div
              className="col-md-10 col-sm-10 col-xs-12"
              style={previewDivStyle}
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: replaceDynamicVariable(
                    data.changedContent,
                    dynamicVariables
                  )
                }}
              />
            </div>
          </React.Fragment>
        )}
        {(alertPermissionStore.permissions.role === "Administrator" ||
          alertPermissionStore.permissions.role === "Editor") && (
          <EditorControl
            data={data}
            edited={edited}
            editMode={editMode}
            activeTab={activeTab}
            onPublish={onPublish}
            onReject={onReject}
            onDraft={onDraft}
            onCancel={onCancel}
            onPreview={onPreview}
            onClickEdit={onClickEdit}
          />
        )}
      </div>
    );
  }
}

Editor.propTypes = {
  data: PropTypes.object.isRequired,
  editMode: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired
};

export default Editor;
