package com.dfhl.test.selenium;

import com.dfhl.test.selenium.pages.HomePage;
import org.openqa.selenium.By;
import org.testng.Assert;
import org.testng.annotations.Test;

public class SampleTestNgTest extends TestNgTestBase {

  private HomePage homepage;

//  @BeforeMethod
//  public void initPageObjects() {
//   homepage = PageFactory.initElements(driver, HomePage.class);
//  }

  @Test
  public void testHomePageHasAHeader() throws InterruptedException {
    System.out.print("baseUrl ::"+baseUrl);
    driver.get(baseUrl);
    Assert.assertNotNull(driver);
    driver.findElement(By.id("menu-item-323")).click();

    Thread.sleep(30000);
    //Assert.assertFalse("".equals(homepage.header.getText()));
  }
}
