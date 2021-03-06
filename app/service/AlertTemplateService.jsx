'use strict';
import AlertManagementService from "./AlertManagementService";
import  AlertTemplateResourceStore from "../store/AlertTemplateStore";

let _data = {"templates":"[{\"alertTemplateResourceId\":1502,\"alertTypeResourceId\":1502,\"alertTypeName\":\"SBU\",\"templateContent\":\"Email Body\",\"templateContentType\":\"EMAIL_BODY\",\"locale\":\"en_US\",\"state\":\"DRAFT\"},{\"alertTemplateResourceId\":1503,\"alertTypeResourceId\":1502,\"alertTypeName\":\"SBU\",\"templateContent\":\"Low Balance Alert for\",\"templateContentType\":\"EMAIL_SUBJECT\",\"locale\":\"en_US\"},{\"alertTemplateResourceId\":1505,\"alertTypeResourceId\":1502,\"alertTypeName\":\"SBU\",\"templateContent\":\"DEFAULT: Corelation Alert Test PUSH_BODY\",\"templateContentType\":\"PUSH_BODY\",\"locale\":\"en_US\"},{\"alertTemplateResourceId\":1501,\"alertTypeResourceId\":1502,\"alertTypeName\":\"SBU\",\"templateContent\":\"DEFAULT: Corelation Alert Test <Span>{RandomText} </Span> SMS_BODY\",\"templateContentType\":\"SMS_BODY\",\"locale\":\"en_US\"}]"};
export default class AlertTemplateService {


    static loadAlertTemplatesResources(alertTypeResource){
        AlertManagementService.getTemplates(alertTypeResource).then((response) => {
            const isLoaded = false;
            AlertTemplateResourceStore.setTemplates(JSON.parse(response.data.alertTemplates),isLoaded)
        })
        .catch((response) => {
            console.log("Exception while fetching templates")
            // for local testing only uncomment above _data variable before using below code.
            AlertTemplateResourceStore.setTemplates(JSON.parse(_data.templates));

        });
    }

    static saveTemplate(alertTemplateResource){
        AlertManagementService.saveTemplates(alertTemplateResource).then((response) => {
            console.log("Saved Templates Successfully");
            const isLoaded = true;
            AlertTemplateResourceStore.setTemplates(JSON.parse(response.data.alertTemplates),isLoaded)
        })
            .catch((response) => {
                console.log("Exception while saving templates")


            });
    }

    static publishTemplate(template){
        AlertManagementService.publishTemplate(template).then((response) => {
            console.log("Publish Template Successful");
            const isLoaded = true;
            AlertTemplateResourceStore.setTemplates(JSON.parse(response.data.alertTemplates), isLoaded)

        })
        .catch((response) => {
            console.log("Exception while saving templates");
        });
    }

    static deleteTemplate(template){
        AlertManagementService.deleteTemplate(template).then((response) => {
            console.log("Publish Template Successful");
            const isLoaded = true;
            AlertTemplateResourceStore.setTemplates(JSON.parse(response.data.alertTemplates), isLoaded)

        })
        .catch((response) => {
            console.log("Exception while saving templates");
        });
    }



}