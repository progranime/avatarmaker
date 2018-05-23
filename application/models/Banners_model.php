<?php

class Banners_model extends CI_Model {

	public function __construct () {
		date_default_timezone_set('Asia/Manila');
	}

	// get
	public function getAllBanners () {
		return $this->db->query("SELECT * FROM tbl_banners WHERE visibility = 1 ORDER BY sort")->result();
	}

	// add
	public function createBanner () {
		$directory 			= "public/images/banners/";
		$extensions 		= array("jpeg","jpg","png");
		$breakpoint 		= array("mobile", "tablet", "desktop");
		$file_name_ext_array = array();

		$name 				= $this->input->post('name');
		$banners 			= $_FILES['banner'];
		$visibility 		= $this->input->post('visibility');
		$sort 				= $this->input->post('sort');

		foreach ($banners["tmp_name"] as $key => $tmp_name) {
			// $file_name 	= $_FILES['banner']['name'][$key];
			$file_name	= $name;
			$file_size 	= $_FILES['banner']['size'][$key];
			$file_tmp 	= $_FILES['banner']['tmp_name'][$key];
    		$file_type	= $_FILES['banner']['type'][$key];
			
			$file_ext	= explode('.',$_FILES['banner']['name'][$key]);
			$file_ext	= end($file_ext);  
			$file_ext 	= strtolower($file_ext);

			$file_name_ext = $file_name . "-" . $breakpoint[$key] . "." . $file_ext;
			// added to array to access easily when adding it to the database
			array_push($file_name_ext_array, $file_name_ext);

			move_uploaded_file($file_tmp, $directory . $file_name_ext);

			/*if(in_array($file_ext,$extensions) === false){
				// $errors[]="extension not allowed";
				move_uploaded_file($file_tmp, $directory . $file_name);
			}*/            

		}

		// add to database

		$this->db->insert('tbl_banners', array(
			"name" => $name,
			"banner_mobile" => $file_name_ext_array[0],
			"banner_tablet" => $file_name_ext_array[1],
			"banner_desktop" => $file_name_ext_array[2],
			"visibility" => $visibility,
			"sort" => $sort,
			"datetime_created" => date('Y-m-d h:i:s')
		));

	}

	// update

	public function updateBanner () {
		// sample renaming of the images

		rename("public/images/banners/sample1.png", "public/images/banners/sample1-rename.png");
	}



	// delete

	public function deleteBanner () {
		$directory 			= "public/images/banners/";
		$id 				=  $this->uri->segment(4);
		$banner_src 		= array();

		$banner = $this->db->get_where("tbl_banners", array("id" => $id))->result();

		array_push($banner_src, $banner[0]->banner_mobile);
		array_push($banner_src, $banner[0]->banner_tablet);
		array_push($banner_src, $banner[0]->banner_desktop);

		// delete entry in tbl_banners
		$this->db->delete('tbl_banners', array(
			"id" => $id
		));

		// deleting the image to the folder
		for ($x = 0; $x < count($banner_src); $x++) {
			unlink($directory . $banner_src[$x]);
		}
		
	}


}