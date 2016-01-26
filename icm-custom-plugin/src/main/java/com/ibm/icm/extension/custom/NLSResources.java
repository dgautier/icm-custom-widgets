package com.ibm.icm.extension.custom;

import java.util.Locale;
import java.util.ResourceBundle;

public class NLSResources {
	private static final String PARM_RESOURCE_BUNDLE_NAME = "com.ibm.icm.extension.custom.nls.CustomPlugin";

	private static ResourceBundle getResourceBundle(Locale locale) {
		ClassLoader loader = NLSResources.class.getClassLoader();
		return ResourceBundle.getBundle(PARM_RESOURCE_BUNDLE_NAME, locale, loader);
	}
   
    public static String getMessage(Locale locale, String messageKey) {
		String nlsMessage = null;
		try {
			ResourceBundle bundle = getResourceBundle(locale);
			nlsMessage = bundle.getString(messageKey);

		} catch (Exception e) {
			System.out.print(e.toString());
		}
		if (nlsMessage == null) {
			nlsMessage = messageKey; // to make it obvious a message is missing
		}		
		return nlsMessage;
	}

}
