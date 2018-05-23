# Avatar Maker - Customizing your own avatar.

> This project can create your own avatar and save to database that will be considered as your Avatar Gallery which can be downloaded with the image format of PNG/JPG and with three download sizes. And there are also avatars that is already created which is called the Avatar Library. You can also add the avatar of your choice to favorites for you to access it easily.

### Need to install

1. **Xampp** : https://www.apachefriends.org/index.html

2. **Nodejs** : https://nodejs.org/en/

3. **Gulp** : https://gulpjs.com/

4. **Tortoise SVN** : https://tortoisesvn.net/

### SVN CHECKOUT

1. Navigate to the **C:/xammp/htdocs** and create a new folder name **music-avatar**.
![svn checkout](/docs/images/svn-checkout1.png)

2. Right click to the empty folder, choose the **SVN Checkout**. And popup will show up. Input this svn repository https://phw0154.music-group.com:3690/svn/music-avatar and click **OK** to get all the save data in the repository.
![svn checkout](/docs/images/svn-checkout2.png)
![svn checkout](/docs/images/svn-checkout3.png)

3. After SVN CHECKOUT you will see that there is no **node_modules**. To have it **Shift + Right Click** and choose **Open command window here**.  To install gulp run this **npm install --global gulp-cli**. And run **gulp** to use it.
![svn checkout](/docs/images/svn-checkout4.png)


### FOLDER / FILE STRUCTURE

1. **application** - this is where you can see the **controllers**, **models** and **views** folder.

	- **controllers** - this is where the functionality that is connecting to the **database** or **model** to return a value / json.        

		- **Avatars.php** - Controller to view the avatars page

		- **Customize.php** - Controller to view the customize page

		- **Get.php** - return data or json

		- **Home.php** - Controller to view the home page

		- **Post.php** - passing data to the database

		- **Search.php** - Controller to view the search page and return values based on the user’s search.

		- **User.php** - Controller to login and logout to the application

	- **models** - class that connecting to the database.
		
		- **Avatars_model.php** - Connecting to avatars table to query and return a array result.
		
		- **Banners_model.php** - Connecting to banners table to query and return a array result.
		
		- **Favorites_model.php** - Connecting to favorites table to query and return a array result.

	- **views** - this is where you can see the html pages and templates.
		- **admin** - admin dashboard.
		- **components** - this is where php file like header.php or modal files.
		- **templates** - this is where the Handlebar Template resides.
		- **avatars.php** - this page where you can see the favorites and gallery list
		- **customize.php** - this is the page where you can customize your avatar.
		- **home.php** - this is the home page of the application.
		- **search.php** - search results page

2. **node_modules** - this is where the files resides for the development dependencies.

3. **public** - this is where the assets, styles (css, sass), javascripts.
	- **data** - this is where the json files or the data of the application.
	- **dist** - this is where the concatenated css and js resides.
	- **images** - all assets of the application
	- **js** - javascript of the application
	- **scss** - styles of the application

4. **system** - this is where the libraries of the codeigniter resides. 


### DATABASE

> For you to test in your local you need to have database, go to **docs/database** and use the updated database. First create database named avatar-revamp. And import it to your localhost. **Link:** localhost/phpmyadmin