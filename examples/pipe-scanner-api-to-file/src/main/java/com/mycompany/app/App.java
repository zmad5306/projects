package com.mycompany.app;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

public class App {
	
	private static final String FEED_URL = "http://relay.broadcastify.com:80/768030603.mp3";
	
    public static void main( String[] args ) throws IOException {
    	URL feedUrl = new URL(FEED_URL);
    	final HttpURLConnection connection = (HttpURLConnection) feedUrl.openConnection();
    	InputStream stream = connection.getInputStream();
    	OutputStream outstream = new FileOutputStream(new File("test.mp3"));
    	
    	Runtime.getRuntime().addShutdownHook(new Thread() {
			@Override
			public void run() {
				System.out.println("in shutdown hook....");
				connection.disconnect();
			}
		});
    	
    	byte[] buffer = new byte[4096];
    	int len;
    	while((len = stream.read(buffer)) != -1) {
    		stream.read(buffer);
    		outstream.write(buffer, 0, len);
    	}
    	
    	stream.close();
    	outstream.close();
    	
    }
}
