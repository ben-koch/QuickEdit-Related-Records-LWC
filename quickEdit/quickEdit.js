import { LightningElement, api, wire, track } from 'lwc';
import getAdmDocs from '@salesforce/apex/QuickEditController.getAdmDocs';
import getEduHistories from '@salesforce/apex/QuickEditController.getEduHistories';
import getTestScores from '@salesforce/apex/QuickEditController.getTestScores';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class QuickEdit extends LightningElement {
    
    @api recordId;
    @api isLoaded = 'false';

    @track admDocs;
    @track testScores;
    @track eduHistories;

    connectedCallback(){

        getAdmDocs({appId: this.recordId})
        .then(result => {
            var objArray = [];
            for (var i = 0; i < result.length; i++){
                var obj = {
                    Id : null,
                    dateReceived : null,
                    documentName : null,
                    documentStatus : null
                }
                var doc = result[i];
                obj.Id = doc.Id;
                obj.dateReceived =(doc.Date_Recieved__c === undefined)?null: doc.Date_Recieved__c;
                obj.documentName = doc.Document_Name__c;
                obj.documentStatus = (doc.Document_Status__c === undefined)?null: doc.Document_Status__c;
                objArray.push(obj);
            }
            this.admDocs = objArray;

        })
        .catch(error => {
            this.error = error;
            this.admDocs = undefined;
        });
        getEduHistories({appId: this.recordId})
        .then(result => {
            var objArray = [];
            for (var i = 0; i < result.length; i++){
                var obj = {
                    Id : null,
                    dateReceived : null,
                    documentName : null,
                    documentStatus : null
                }
                var edu = result[i];
                obj.Id = edu.Id;
                obj.dateReceived =(edu.Date_Received__c === undefined)?null: edu.Date_Received__c;
                obj.documentName = edu.Document_Type__c;
                obj.documentStatus = (edu.Document_Status__c === undefined)?null: edu.Document_Status__c;
                objArray.push(obj);
            }
            this.eduHistories = objArray;

        })
        .catch(error => {
            this.error = error;
            this.eduHistories = undefined;
        });
        getTestScores({appId: this.recordId})
        .then(result => {
            console.log(result)
            var objArray = [];
            for (var i = 0; i < result.length; i++){
                var obj = {
                    Id : null,
                    dateReceived : null,
                    documentName : null,
                    documentStatus : null
                }
                var score = result[i];
                obj.Id = score.Id;
                obj.dateReceived =(score.Date_Received__c === undefined)?null: score.Date_Received__c;
                obj.documentName = score.RecordType.Name;
                obj.documentStatus = (score.Document_Status__c === undefined)?null: score.Document_Status__c;
                objArray.push(obj);
            }   
            this.testScores = objArray;
            console.log(this.testScores)
        })
        .catch(error => {
            this.error = error;
            this.testScores = undefined;
        });

        if (document.readyState === 'interactive'){
            this.isLoaded = true;
        }
    }

    showSuccessToast() {
        const evt = new ShowToastEvent({
            title: 'Success!',
            message: 'Record Successfully Updated',
            variant: 'success',
            mode: 'dismissable'
        });
        this.dispatchEvent(evt);
    }
    
}