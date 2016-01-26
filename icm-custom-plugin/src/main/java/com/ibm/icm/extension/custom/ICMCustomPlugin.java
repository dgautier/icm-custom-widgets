package com.ibm.icm.extension.custom;

import java.util.Locale;


import com.ibm.ecm.extension.Plugin;
import com.ibm.ecm.extension.PluginAction;
import com.ibm.icm.extension.custom.actions.CustomAddCaseAction;
import com.ibm.icm.extension.custom.actions.CustomAddToAttachmentAction;
import com.ibm.icm.extension.custom.actions.CustomAddTaskAction;
import com.ibm.icm.extension.custom.actions.CustomAddCasePerRoleAction;

public class ICMCustomPlugin extends Plugin {

	@Override
	public String getId() {
		// TODO Auto-generated method stub
		return "ICMCustomPlugin";
	}

	@Override
	public String getName(Locale locale) {
		// TODO Auto-generated method stub
		String name = NLSResources.getMessage(locale, "icm.plugin.name");
		return name;
	}

	@Override
	public String getVersion() {
		// TODO Auto-generated method stub
		return "1.0";
	}

	@Override
	public PluginAction[] getActions() {
		return new PluginAction[] { new CustomAddCaseAction(), new CustomAddToAttachmentAction(), new CustomAddTaskAction(), new CustomAddCasePerRoleAction()};
	}

	// @Override
	// public String getDojoModule() {
	// return "customWidget";
	// }

	@Override
	public String getScript() {
		return "ICMCustomPlugin.js";
	}

}
