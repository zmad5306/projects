package com.mycompany.app;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;

public class App {

	private static final String FEED_URL = "http://relay.broadcastify.com:80/768030603.mp3";

	public static void main(String[] args) throws IOException {
		URL feedUrl = new URL(FEED_URL);
		URLConnection connection = (HttpURLConnection) feedUrl.openConnection();
		
		InputStream stream = null;
		OutputStream outstream = null;
		try {
			stream = connection.getInputStream();
			outstream = new FileOutputStream(new File("test.mp3"));

			byte[] buffer = new byte[4096];
			int len;
			while ((len = stream.read(buffer)) != -1) {
				outstream.write(buffer, 0, len);
			}
		} finally {
			if (null != stream ) { 
				stream.close();
			}
			
			if (null != outstream) {
				outstream.close();
			}
		}

		

	}
}
