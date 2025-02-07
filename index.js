import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import java.util.concurrent.TimeUnit;

public class WhatsAppOTPExample {
    public static void main(String[] args) {
        // Set the path to your ChromeDriver executable
        System.setProperty("webdriver.chrome.driver", "path/to/chromedriver");

        // Initialize the WebDriver
        WebDriver driver = new ChromeDriver();

        // Open WhatsApp Web
        driver.get("https://web.whatsapp.com");

        // Wait for the user to scan the QR code manually
        try {
            TimeUnit.SECONDS.sleep(20); // Wait for 20 seconds
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        // Locate the phone number input field and enter the phone number
        WebElement phoneNumberField = driver.findElement(By.xpath("//input[@title='Phone number']"));
        phoneNumberField.sendKeys("YOUR_PHONE_NUMBER");

        // Locate and click the "Next" button
        WebElement nextButton = driver.findElement(By.xpath("//button[@class='_2EoyP']"));
        nextButton.click();

        // Wait for OTP to be entered manually
        try {
            TimeUnit.SECONDS.sleep(20); // Wait for 20 seconds
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        // Close the browser
        driver.quit();
    }
}
