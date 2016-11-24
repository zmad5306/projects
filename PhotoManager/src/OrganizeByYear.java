import java.io.File;
import java.io.FileFilter;
import java.io.IOException;
import java.util.Calendar;
import java.util.Date;

import com.drew.imaging.ImageMetadataReader;
import com.drew.imaging.ImageProcessingException;
import com.drew.metadata.Metadata;
import com.drew.metadata.exif.ExifSubIFDDirectory;

public class OrganizeByYear {

	public static void main(String[] args) throws IOException {
		File dir = new File("E:\\Zach\\Pictures");
		for (File file : dir.listFiles(new FileFilter() {
			
			@Override
			public boolean accept(File pathname) {
				return !pathname.isDirectory();
			}
		})) {
			Metadata metadata = null;
			try {
				metadata = ImageMetadataReader.readMetadata(file);
			} catch (ImageProcessingException e) {
				System.out.println("skipping: " + file.getName());
			}
			if (null != metadata) {
				ExifSubIFDDirectory directory = metadata.getFirstDirectoryOfType(ExifSubIFDDirectory.class);
				if (null != directory) {
					Date date = directory.getDate(ExifSubIFDDirectory.TAG_DATETIME_ORIGINAL);
					if (null != date) {
						Calendar calendar = Calendar.getInstance();
						calendar.setTime(date);
						String year = Integer.valueOf(calendar.get(Calendar.YEAR)).toString();
						File yearDir = new File(dir, year);
						if (!yearDir.exists()) {
							yearDir.mkdir();
						}
						
						File nFile = new File(yearDir, file.getName());
						for (int i = 0; 0 < 10 && nFile.exists(); i++) {
							int index = file.getName().lastIndexOf(".");
							String ext = file.getName().substring(index);
							
							String fn = file.getName().substring(0, index);
							
							nFile = new File(yearDir, fn + "(" + Integer.valueOf(i+1) + ")" + ext);
						}
						
						if (nFile.exists()) {
							System.out.println("skipping (name conflict): " + file.getName());
						}
						else {
//							System.out.println(nFile.getName());
							file.renameTo(nFile);
						}
					}
					//System.out.println(date);
				}
			}
			
			
			
			
//			for (Directory directory : metadata.getDirectories()) {
//			    for (Tag tag : directory.getTags()) {
//			        System.out.println(tag);
//			    }
//			}
		}

	}

}
