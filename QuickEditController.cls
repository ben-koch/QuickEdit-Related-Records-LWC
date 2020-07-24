public with sharing class QuickEditController {
    @AuraEnabled(cacheable=true)
    public static List<Admissions_Document__c> getAdmDocs(String appId){
        List<Admissions_Document__c> admDocs = [SELECT Id, Document_Name__c, Document_Status__c, Date_Recieved__c FROM Admissions_Document__c WHERE Application__c = :appId];
        return admDocs;
    }
    @AuraEnabled(cacheable=true)
    public static List<Education_History__c> getEduHistories(String appId){
        Application__c app = [SELECT Contact__c FROM Application__c WHERE Id = :appId];
        List<Education_History__c> eduHistories = [SELECT Id, Document_Type__c, Document_Status__c, Date_Received__c FROM Education_History__c WHERE ((Applicant__c = :app.Contact__c) OR (Contact__c = :app.Contact__c))];
        return eduHistories;
    }
    @AuraEnabled(cacheable=true)
    public static List<hed__Test_Score__c> getTestScores(String appId){
        Application__c app = [SELECT Contact__c FROM Application__c WHERE Id = :appId];
        List<hed__Test_Score__c> testScores = [SELECT Id, Document_Status__c, Date_Received__c, RecordTypeId, RecordType.Name FROM hed__Test_Score__c WHERE Contact__c = :app.Contact__c];
        return testScores;
    }
}