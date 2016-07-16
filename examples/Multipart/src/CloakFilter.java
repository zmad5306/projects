import java.io.IOException;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Random;
import java.util.Set;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@WebFilter(filterName = "CloakFilter", urlPatterns = "/*")
public class CloakFilter implements Filter {

	@Override
	public void destroy() {
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain filterChain)
			throws IOException, ServletException {
		//wrap request and response
		UnCloakingRequest req = new UnCloakingRequest((HttpServletRequest) request);
		CloakingResponse resp = new CloakingResponse((HttpServletResponse) response);

		//run chain with wrapped request and response
		filterChain.doFilter(req, resp);

		//cloak response
		Map<String, String> parameterNames = new HashMap<String, String>();
		HttpSession httpSession = ((HttpServletRequest) request).getSession(true);

		//gets the content written to response
		String content = resp.getCaptureAsString();
		Set<String> names = new HashSet<String>();

		//find all name attributes in response
		int index = -1;
		while ((index = content.indexOf(" name=", index + 1)) > -1) {
			int endIndex = content.indexOf("\"", index + 7) + 1;
			String name = content.substring(index + 1, endIndex);
			names.add(name);
		}

		//replace all name attributes with a random number
		Random rand = new Random();

		for (String name : names) {
			int randomNum = rand.nextInt((999999999 - 100000000) + 1) + 100000000;
			content = content.replaceAll(name, "name=\""+randomNum+"\"");
			
			int firstQuoteIndex = name.indexOf("\"") + 1;
			int secondQuoteIndex = name.indexOf("\"", firstQuoteIndex);
			
			String strippedName = name.substring(firstQuoteIndex, secondQuoteIndex);
			
			parameterNames.put(Integer.valueOf(randomNum).toString(), strippedName);
		}
		
		//write modified response to client
		response.getWriter().write(content);
		response.setContentLength(content.length());
		
		//put the cloaked names into the session so they'll be there when the page is submitted
		httpSession.setAttribute("parameterNames", parameterNames);
	}

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
	}

}
