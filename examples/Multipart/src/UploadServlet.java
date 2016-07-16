import java.io.IOException;
import java.io.InputStream;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;

@WebServlet("/upload")
@MultipartConfig
public class UploadServlet extends HttpServlet {

	private static final long serialVersionUID = 5762973754703989733L;

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		String description = req.getParameter("description");
	    Part filePart = req.getPart("file");
	    String fileName = filePart.getSubmittedFileName();
	    InputStream fileContent = filePart.getInputStream();
	    
	    System.out.println("description: " + description);
	    System.out.println("fileName: " + fileName);
	    System.out.println("fileContent: ");
	    
	    byte[] buffer = new byte[1024];
	    int bytesRead = 0;
	    
	    while((bytesRead = fileContent.read(buffer)) > 0) {
	    	byte[] trimmedBuffer = new byte[bytesRead];
	        System.arraycopy(buffer, 0, trimmedBuffer, 0, bytesRead);
	    	System.out.print(new String(trimmedBuffer));
	    }
	    
	    System.out.println();
	    System.out.println();
	    System.out.println();
	    
	    resp.sendRedirect("index.jsp");
	}
	
}
