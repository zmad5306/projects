import java.io.ByteArrayOutputStream;
import java.io.IOException;

import javax.servlet.ServletOutputStream;
import javax.servlet.WriteListener;

/**
 * 
 * @author Zach
 *
 * A servlet output stream that caches the content locally in a byte array. The 
 * content is not flushed to the client by the stream!
 */
public class CloakServletOutputStream extends ServletOutputStream {
	
	ServletOutputStream out;
	ByteArrayOutputStream baos;
	
	public CloakServletOutputStream(ServletOutputStream out) {
		this.out = out;
		baos = new ByteArrayOutputStream();
	}

	@Override
	public boolean isReady() {
		return out.isReady();
	}

	@Override
	public void setWriteListener(WriteListener writeListener) {
		out.setWriteListener(writeListener);
	}

	@Override
	public void write(int b) throws IOException {
		baos.write(b);
	}
	
	@Override
	public void flush() throws IOException {
		out.write(baos.toByteArray());
		baos.reset();
		out.flush();
	}
	
	@Override
	public void close() throws IOException {
		out.write(baos.toByteArray());
		baos.reset();
		out.close();
	}

}
