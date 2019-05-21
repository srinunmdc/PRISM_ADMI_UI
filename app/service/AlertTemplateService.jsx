import AlertManagementService from "./AlertManagementService";
import AlertTemplateResourceStore from "../store/AlertTemplateStore";
import LoaderResourceStore from "../store/LoaderStore";

const _data = {
  templates:
    '[{"alertTemplateResourceId":1502,"alertTypeResourceId":1502,"alertTypeName":"SBU","templateContent":"Email Body","templateContentType":"EMAIL_BODY","locale":"en_US","state":"DRAFT"},{"alertTemplateResourceId":1503,"alertTypeResourceId":1502,"alertTypeName":"SBU","templateContent":"Low Balance Alert for","templateContentType":"EMAIL_SUBJECT","locale":"en_US"},{"alertTemplateResourceId":1505,"alertTypeResourceId":1502,"alertTypeName":"SBU","templateContent":"DEFAULT: Corelation Alert Test PUSH_BODY","templateContentType":"PUSH_BODY","locale":"en_US"},{"alertTemplateResourceId":1501,"alertTypeResourceId":1502,"alertTypeName":"SBU","templateContent":"DEFAULT: Corelation Alert Test <Span>{RandomText} </Span> SMS_BODY","templateContentType":"SMS_BODY","locale":"en_US"}]',
  dynamicVariables: '{"accountNumber": "xxx1234", "accountType": "Savings"}'
};

export default class AlertTemplateService {
  static loadAlertTemplatesResources(alertTypeResource) {
    LoaderResourceStore.loadingStart();
    AlertManagementService.getTemplates(alertTypeResource)
      .then(response => {
        const isLoaded = false;
        LoaderResourceStore.loadingComplete();
        AlertTemplateResourceStore.setTemplates(
          JSON.parse(response.data.alertTemplates),
          isLoaded
        );
      })
      .catch(response => {
        console.log("Exception while fetching templates");
        // for local testing only uncomment above _data variable before using below code.
        LoaderResourceStore.loadingComplete();
        AlertTemplateResourceStore.setTemplates(JSON.parse(_data.templates));
      });
  }

  static saveTemplate(alertTemplateResource) {
    LoaderResourceStore.loadingStart();
    AlertManagementService.saveTemplates(alertTemplateResource)
      .then(response => {
        console.log("Saved Templates Successfully");
        LoaderResourceStore.loadingComplete();
        const isLoaded = true;
        AlertTemplateResourceStore.setTemplates(
          JSON.parse(response.data.alertTemplates),
          isLoaded
        );
      })
      .catch(response => {
        LoaderResourceStore.loadingComplete();
        console.log("Exception while saving templates");
      });
  }

  static publishTemplate(template) {
    LoaderResourceStore.loadingStart();
    AlertManagementService.publishTemplate(template)
      .then(response => {
        console.log("Publish Template Successful");
        LoaderResourceStore.loadingComplete();
        const isLoaded = true;
        AlertTemplateResourceStore.setTemplates(
          JSON.parse(response.data.alertTemplates),
          isLoaded
        );
      })
      .catch(response => {
        LoaderResourceStore.loadingComplete();
        console.log("Exception while saving templates");
      });
  }

  static deleteTemplate(template) {
    LoaderResourceStore.loadingStart();
    AlertManagementService.deleteTemplate(template)
      .then(response => {
        console.log("Publish Template Successful");
        LoaderResourceStore.loadingComplete();
        const isLoaded = true;
        AlertTemplateResourceStore.setTemplates(
          JSON.parse(response.data.alertTemplates),
          isLoaded
        );
      })
      .catch(response => {
        LoaderResourceStore.loadingComplete();
        console.log("Exception while saving templates");
      });
  }
}
