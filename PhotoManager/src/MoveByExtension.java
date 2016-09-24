import java.io.File;
import java.io.FilenameFilter;

public class MoveByExtension {

	public static void main(String[] args) {
		File dir = new File("E:\\Zach\\Pictures");
		File[] duplicates = dir.listFiles(new FilenameFilter() {
			
			@Override
			public boolean accept(File dir, String name) {
				
				return name.endsWith(".psd");
					
			}
		});
		
		System.out.println(duplicates.length);
		
		if (duplicates.length > 0) {
		
			File moveTo = new File(dir, "Photoshop");
			if (!moveTo.exists()) {
				moveTo.mkdir();
			}
			
			for (File dup : duplicates) {
				System.out.println(dup.getName());
				dup.renameTo(new File(moveTo, dup.getName()));
			}
		
		}
		
		

	}

}
