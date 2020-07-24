@isTest
public with sharing class QuickEditControllerTest {
    @isTest
    static void test() {
        Contact con = New Contact();
        con.LastName = 'Test';
        insert con;
        Application__c app = New Application__c();
        app.Contact__c = con.Id;
        app.Requirement_Type__c = 'Freshman';
        insert app;
        List<Admissions_Document__c> docs = QuickEditController.getAdmDocs(app.Id);
        List<Education_History__c> edus = QuickEditController.getEduHistories(app.Id);
        List<hed__Test_Score__c> scores = QuickEditController.getTestScores(app.Id);
    }
}

