import java.io.File;
import java.io.FilenameFilter;
import java.util.HashSet;
import java.util.Set;

public class ExtensionFinder {
	
	public static void main(String[] args) {
		File dir = new File("E:\\Zach\\Pictures");
		
		Set<String> extensions = new HashSet<String>();
		
		dir.listFiles(new FilenameFilter() {
			
			@Override
			public boolean accept(File dir, String name) {
				int index = name.lastIndexOf(".");
				
				if (index > -1) {
//					System.out.println(index + "   " + name);
					extensions.add(name.substring(index));
				}
				return false;
			}
		});
		
		for (String e : extensions) {
			System.out.println(e);
		}
	}

}
