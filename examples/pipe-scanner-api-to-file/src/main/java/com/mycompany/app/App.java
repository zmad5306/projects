package com.mycompany.app;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URL;
import java.net.URLConnection;
import java.text.SimpleDateFormat;
import java.util.Date;

public class App {

	private static final String FEED_URL = "http://relay.broadcastify.com:80/768030603.mp3";
	private static final SimpleDateFormat DATE_FORMAT = new SimpleDateFormat("yyyyMMddhhmmssSSS");
	private static final int FILE_SPLIT_SIZE = 10485760;

	public static void main(String[] args) throws IOException {
		URL feedUrl = new URL(FEED_URL);
		URLConnection connection = feedUrl.openConnection();
		
		InputStream stream = null;
		OutputStream outstream = null;
		try {
			stream = connection.getInputStream();
			outstream = new FileOutputStream(new File(generateOutFileName()));

			byte[] buffer = new byte[4096];
			int len;
			int bytesRead = 0;
			while ((len = stream.read(buffer)) != -1) {
				bytesRead += len;
				outstream.write(buffer, 0, len);
				outstream.flush();
				if (bytesRead > FILE_SPLIT_SIZE) {
					bytesRead = 0;
					outstream.close();
					outstream = new FileOutputStream(new File(generateOutFileName()));
				}
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

	private static String generateOutFileName() {
		return DATE_FORMAT.format(new Date(System.currentTimeMillis())) + ".mp3";
	}
}
