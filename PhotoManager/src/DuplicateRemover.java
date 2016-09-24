import java.io.File;
import java.io.FilenameFilter;

public class DuplicateRemover {

	public static void main(String[] args) {
		File dir = new File("E:\\Zach\\Pictures");
		File[] duplicates = dir.listFiles(new FilenameFilter() {
			
			@Override
			public boolean accept(File dir, String name) {
				
				if (name.contains("(2).")
				|| name.contains("(3).")
				|| name.contains("(4).")
				|| name.contains("(5).")) {
					
					String baseName = name.replace("(2).", ".")
							.replace("(3).", ".")
							.replace("(4).", ".")
							.replace("(5).", ".");
					
//					System.out.println(name);
//					System.out.println(baseName);
					
					File base = new File(dir, baseName);
					File dup = new File(dir, name);
					
					if (base.exists()) {
						if(base.length() == dup.length()) {
//							System.out.println(base.length() + " " + dup.length());
							return true;
						}
					}
					
					
				}
				
				return false;
			}
		});
		
		System.out.println(duplicates.length);
		
		if (duplicates.length > 0) {
		
			File moveTo = new File(dir, "Duplicates");
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
