/*
 * Licensed Materials - Property of IBM (c) Copyright IBM Corp. 2012 All Rights Reserved.
 *
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 *
 * DISCLAIMER OF WARRANTIES :
 *
 * Permission is granted to copy and modify this Sample code, and to distribute modified versions provided that both the
 * copyright notice, and this permission notice and warranty disclaimer appear in all copies and modified versions.
 *
 * THIS SAMPLE CODE IS LICENSED TO YOU AS-IS. IBM AND ITS SUPPLIERS AND LICENSORS DISCLAIM ALL WARRANTIES, EITHER
 * EXPRESS OR IMPLIED, IN SUCH SAMPLE CODE, INCLUDING THE WARRANTY OF NON-INFRINGEMENT AND THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE. IN NO EVENT WILL IBM OR ITS LICENSORS OR SUPPLIERS BE LIABLE FOR
 * ANY DAMAGES ARISING OUT OF THE USE OF OR INABILITY TO USE THE SAMPLE CODE, DISTRIBUTION OF THE SAMPLE CODE, OR
 * COMBINATION OF THE SAMPLE CODE WITH ANY OTHER CODE. IN NO EVENT SHALL IBM OR ITS LICENSORS AND SUPPLIERS BE LIABLE
 * FOR ANY LOST REVENUE, LOST PROFITS OR DATA, OR FOR DIRECT, INDIRECT, SPECIAL, CONSEQUENTIAL, INCIDENTAL OR PUNITIVE
 * DAMAGES, HOWEVER CAUSED AND REGARDLESS OF THE THEORY OF LIABILITY, EVEN IF IBM OR ITS LICENSORS OR SUPPLIERS HAVE
 * BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
 */

package com.ibm.icm.extension.custom.actions;

import java.io.IOException;
import java.util.Locale;

import com.ibm.ecm.extension.PluginAction;
import com.ibm.json.java.JSONObject;

public class CustomAddToAttachmentAction extends PluginAction
{
	private final static String CONST_ACTION_ICON = "ScriptAction.gif";

	@Override
	public String getId() {
		return "custom.CAddToAttachmentAction";
	}

	@Override
	public String getIcon() {
		return CONST_ACTION_ICON;
	}

	@Override
	public String getPrivilege() {
		return "";
	}

	@Override
	public boolean isMultiDoc() {
		return false;
	}

	public boolean isGlobal() {
		return false;
	}

	@Override
	public String getActionModelClass() {
		return "icm.custom.action.CustomAddToAttachmentAction";
	}

	@Override
	public JSONObject getAdditionalConfiguration(Locale locale) {
		String jsonString = "{\r\n" +
				"	        \"ICM_ACTION_COMPATIBLE\": true,\r\n" +
				"	        \"context\": [[\"Document\"]],\r\n" +
				"            \"name\": \"Custom Add Document As Attachment\",\r\n" +
				"	    \"description\": \"An action to document as attachment\",\r\n" +
				"       \"type\": \"iterator\",\r\n" +
				"            \"properties\": [\r\n" +
				"                {\r\n" +
				"                    \"id\": \"label\",\r\n" +
				"                    \"title\": \"Add Document As Attachment\",\r\n" +
				"                    \"defaultValue\": \"Add Document As Attachment\",\r\n" +
				"                    \"type\": \"string\",\r\n" +
				"                    \"isLocalized\":false\r\n" +
				"                }\r\n" +
				"            ],\r\n" +
				"            \"events\":[\r\n" +
				"                {\r\n" +
				"                \"id\":\"icm.AddDocumentAsAttachment\",\r\n" +
				"                \"title\":\"Add document as attachment\",\r\n" +
				"                \"direction\":\"published\",\r\n" +
				"                \"type\":\"wiring\",\r\n" +
				"                \"description\":\"Add document as attachment\"\r\n" +
				"                }\r\n" +
				"            ]\r\n" +
				"	}";
		try {
			return JSONObject.parse(jsonString);
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public String getActionFunction() {
		return "performaAction";
	}

	@Override
	public String getName(Locale arg0) {
		return "Add Document as Attachment";
	}

	@Override
	public String getServerTypes() {
		return "p8";
	}

}
