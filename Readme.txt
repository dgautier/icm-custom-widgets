See : https://www.ibm.com/developerworks/community/blogs/e8206aad-10e2-4c49-b00c-fee572815374/entry/creating_custom_widgets_in_icm_5_2_1_using_icm_javascript_api?lang=en

This custom widgets sample project is built for IBM Case Manager 5.2. It includes several sample page widgets and actions.

1.Actions
1.1 With the icm/custom/action/CustomAddCaseAction, you could add a case from arbitrary solution and case type.
In page designer, you could add the action to toolbar page widget in cases page, then configure the action with the particular solution name and case type symbolic name with solution prefix you want to add. In runtime, when you click the custom add case action button, it will open the add case page from the configured solution for the configured case type.


1.2 With the icm/custom/action/CustomAddToAttachmentAction, you could add a case document as attachment.
With page designer, in a work detail page, you could add this action to the context menu of the case document inside the case information page widget. And, adding the event wiring from case information's event of 'Add document as attachment' to the attachment's 'Add document attachment'. In runtime, you can select a case document, bring up the context menu, select an attachment name from the submenu. The document will be add to attachment pag widget under the selected attachment name.

1.3 With the icm/custom/action/CustomAddtaskAction, you could add task of specific type which could be configured in page designer, without bring up the select task type dialog.
In the page widget configuration panel, you can select case type and task type to be added, then in runtime, the action will add task of the specific task type. There is another configuration item you can use to tell the action to add the task directly without bring up the add task page.

1.4 With the icm/custom/action/CustomAddCasePerRoleAction, you could add case with different add case page per role configuration.(Workable after ICM 5.2.0.1)
In the page widget configuration panel, you can select case type to be added, and an configuration item in JSON format to tell which add case page will be used for a spscific role. In runtime, after user click on the add case action button, then it will bring up the add case page corresponding to the current user role.
JSON sample for per role add case page configuration - '{"<SolutionPrefix>_<RoleName>":"<PageResourceId>","CJ5_r1":"CmAcmCASE_NEW_DEFAULT_PAGE"}'

2.Page widgets
2.1 The simple custom page widget icm/custom/pgwidget/customWidget/CustomPageWidget, it demonstrates the basic page widget definition file format and source code structure we recommended. It also includes some additional sample code for build toolbar and context menu.
You could put it in any page, add event wiring with any incoming event. In runtime, it will show the properties name and value pair you configured in page designer. When it receive a event, it will show the event name. There is a text area from which you could bring up a context menu, and a toolbar with a simple open web page action button.

2.2 The case comment page widget icm/custom/pgwidget/commentWidget/CommentWidget, it demonstrates embedding the case comment dialog in a page widget, which coordinates with case toolbar page widget to save the unsaved case comment when case being saving, and could mark/clear page dirty state before after the case comments are saved.
With page designer, in case detail page, you can add the case comment page widget. In runtime, you will observe the page will be marked and cleared the dirty state when and after you adding case comment. The unsaved case comment will be saved automatically when you save the case.

2.3 The custom case information page widget icm/custom/pgwidget/customcaseinfo/CustomCaseInfo, it is created for servings the ‘add case document as attachment’ action, which injects WorkItem model object as part of action context. Also, it demonstrates how to add a custom tab in case information page widget with embeding the case comment in additional tab.

2.4 The custom case list page widget icm/custom/pgwidget/customcaselist/CustomCaseList, it demonstrates the way to highlight case property value according to business rules by writting a view decorator.
To make it work, you need to create a solution with prefix 'A074A' and an Integer property called 'intID' to test.
When the 'intID' property value is greater or equal to 200 and less than 500, the property is displayed in green indicating that the case is in good state. Otherwise if the 'intID' property value is greater or equal to 500, the property is displayed in yellow indicating that the case is in risk, or in red if the value is below 200 for alarm.

2.5 The custom in-basket page widget icm/custom/pgwidget/custominbasket/CustomInbasket, it demonstrate the way to highlight workitem property value according to business rules by writting a view decorator.
To make it work, you need to create a solution with prefix 'B615' and an Integer property called 'flo' to test.
When the 'flo' property value is greater or equal to 200 and less than 500, the property is displayed in green indicating that the case is in good state. Otherwise if the 'flo' property value is greater or equal to 500, the property is displayed in yellow indicating that the case is in risk, or in red if the value is below 200 for alarm.

2.6 The custom search page widget icm/custom/pgwidget/customSearchWidget/CustomSearchWidget, it demonstrates to customize the case search page widget to search on any property in a solution. It is based on a Credit Card Dispute Solution with the solution prefix CCDMF and a custom property called AssignedToUser.
You could put it to the cases page, in runtime, enter a value for one of the fields, "AssignedToUser", "Merchant Contacted" or "Customer Name" and the results 	will be displayed in the Case list widget.

2.7 The custom viewer page widget icm/custom/pgwidget/customviewer/CustomViewer, it demonstrates approaches that can be taken to embed Viewer widget into other page widget or into modal dialog.

2.8 The custom script adaptor widget icm/custom/pgwidget/customScriptAdapter/CustomScriptAdapter, it demostrates to customize the script adaptor page widget to be able to input and run script in runtime.



