import java.io.IOException;
import java.util.Map;
import java.util.Map.Entry;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;
import javax.servlet.http.HttpSession;
import javax.servlet.http.Part;

public class UnCloakingRequest extends HttpServletRequestWrapper {
	
	public UnCloakingRequest(HttpServletRequest request) {
		super(request);
	}

	@SuppressWarnings("unchecked")
	@Override
	public Part getPart(String name) throws IOException, ServletException {
		//get cloaked value from session
		HttpSession httpSession = super.getSession(true);
		Map<String, String> parameterNames = (Map<String, String>) httpSession.getAttribute("parameterNames");
		
		//get the part by the cloaked name from request
		for(Entry<String, String> entry: parameterNames.entrySet()) {
			if (entry.getValue().equals(name)) {
				return super.getPart(entry.getKey());
			}
		}
		
		return super.getPart(name);
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public String getParameter(String name) {
		//get cloaked value from session
		HttpSession httpSession = super.getSession(true);
		Map<String, String> parameterNames = (Map<String, String>) httpSession.getAttribute("parameterNames");
		
		//get the parameter by the cloaked name from request
		for(Entry<String, String> entry: parameterNames.entrySet()) {
			if (entry.getValue().equals(name)) {
				return super.getParameter(entry.getKey());
			}
		}
		
		return super.getParameter(name);
	}

}
