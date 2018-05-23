<?php

class Get extends CI_Controller {
	private $_libraryModel = null;

	public function index () {
		// $this->_libraryModel = $this->load->model('Library_model');
	}

	public function getAllLibrary () {
		// print_r(json_encode(array("lists" => $this->Library_model->getAllLibrary())));
		print_r(json_encode(array("lists" => $this->isFavorite($this->Avatars_model->getAllLibrary()))));
	}

	public function getMyFavoritesInLibrary () {
		/*$libraryArray = $this->Library_model->getAllLibrary();
		print_r(json_encode(array("lists" => $this->isFavorite($libraryArray))));*/
		/*$libraryArray = $this->Avatars_model->getAllLibrary();
		print_r(json_encode(array("lists" => $this->isFavorite($libraryArray))));*/

		$libraryArrayForeignId = $this->db->query("SELECT foreign_id FROM tbl_favorites 
											WHERE table_name = 'library' AND user = 'jeremy.espinosa' ")->result();

		$strForeigId = $this->implodeArray($libraryArrayForeignId, ",");

		$favoriteLibrary = $this->db->query("SELECT * FROM tbl_avatars 
						  WHERE id IN (". $strForeigId .") ")->result();

		print_r(json_encode(array("lists" => $this->isFavorite($favoriteLibrary))));
	}

	public function getAllLibraryBasedOnGender () {
		/*print_r(json_encode(array("lists" => $this->Library_model->getAllLibraryBasedOnGender())));*/
		print_r(json_encode(array("lists" => $this->isFavorite($this->Avatars_model->getAllLibraryBasedOnGender()))));
	}

	public function getAllMyFavoritesInAllTable () {
		// print_r(json_encode(array("lists" => $this->myFavoritesInAllTable())));
		print_r(json_encode(array("lists" => $this->myFavoritesInAllTable())));
	}

	public function getAllMyGallery () {
		// print_r(json_encode(array("lists" => $this->isFavorite($this->Gallery_model->getAllMyGallery()))));
		print_r(json_encode(array("lists" => $this->isFavorite($this->Avatars_model->getAllMyGallery()))));

	}

	public function getMyFavoritesInAllTableBasedOnGender () {
		// print_r(json_encode(array("lists" => $this->myFavoritesInAllTableBasedOnGender())));
		print_r(json_encode(array("lists" => $this->myFavoritesInAllTableBasedOnGender())));
	}

	public function getAllMyGalleryBasedOnGender () {
		// print_r(json_encode(array("lists" => $this->myGalleryBasedOnGender())));
		print_r(json_encode(array("lists" => $this->myGalleryBasedOnGender())));
	}


	/*  */

	public function myGalleryBasedOnGender() {
		// getting the value of the selected option
		$value = $this->input->get("value");
		// getting the query results
		$query = $this->db->query("SELECT * FROM tbl_avatars 
									WHERE gender = '$value' AND user = '{$this->session->userdata('username')}' AND type = 'gallery'
									ORDER BY datetime_created DESC")->result();
		// return all the results that is either favorite or not
		return $this->isFavorite($query);
	}

	public function myFavoritesInAllTableBasedOnGender() {

		/*//get separately the table of library and gallery
		//then after getting the array combined the two array and return it as one array
		$libraryArray = array();
		$galleryArray = array();
		$gender = $this->input->get("value");
		
		$libraryIndexArray = $this->db->query("SELECT foreign_id FROM tbl_favorites WHERE table_name = 'library' AND user ='{$this->session->userdata('username')}' ")->result();
		$galleryIndexArray = $this->db->query("SELECT foreign_id FROM tbl_favorites WHERE table_name = 'gallery' AND user ='{$this->session->userdata('username')}'")->result();

		// get all the id's
		$strLibraryForeignIndex = $this->implodeArray($libraryIndexArray, ",");
		$strGalleryForeignIndex = $this->implodeArray($galleryIndexArray, ",");

		if(!empty($strLibraryForeignIndex)) {
			$libraryArray = $this->db->query("SELECT * FROM tbl_library WHERE id IN (" . $strLibraryForeignIndex . ") AND gender = '{$gender}'")->result();
		}

		if(!empty($strGalleryForeignIndex)) {
			$galleryArray = $this->db->query("SELECT * FROM tbl_gallery WHERE id IN (" . $strGalleryForeignIndex . ") AND gender = '{$gender}'")->result();
		}

		return $this->isFavorite(array_merge($galleryArray, $libraryArray));*/

		//get separately the table of library and gallery
		//then after getting the array combined the two array and return it as one array
		$libraryArray = array();
		$galleryArray = array();
		$gender = $this->input->get("value");
		
		$libraryIndexArray = $this->db->query("SELECT foreign_id FROM tbl_favorites WHERE table_name = 'library' AND user ='{$this->session->userdata('username')}' ")->result();
		$galleryIndexArray = $this->db->query("SELECT foreign_id FROM tbl_favorites WHERE table_name = 'gallery' AND user ='{$this->session->userdata('username')}'")->result();

		// get all the id's
		$strLibraryForeignIndex = $this->implodeArray($libraryIndexArray, ",");
		$strGalleryForeignIndex = $this->implodeArray($galleryIndexArray, ",");

		if(!empty($strLibraryForeignIndex)) {
			$libraryArray = $this->db->query("SELECT * FROM tbl_avatars WHERE id IN (" . $strLibraryForeignIndex . ") AND gender = '{$gender}' AND type = 'library' ")->result();
		}

		if(!empty($strGalleryForeignIndex)) {
			$galleryArray = $this->db->query("SELECT * FROM tbl_avatars WHERE id IN (" . $strGalleryForeignIndex . ") AND gender = '{$gender}' AND type = 'gallery' ")->result();
		}

		return $this->isFavorite(array_merge($galleryArray, $libraryArray));
	}

	public function myFavoritesInAllTable() {

		/*//get separately the table of library and gallery
		//then after getting the array combined the two array and return it as one array
		$libraryArray = array();
		$galleryArray = array();
		
		$libraryIndexArray = $this->db->query("SELECT foreign_id FROM tbl_favorites WHERE table_name = 'library' AND user ='{$this->session->userdata('username')}' ")->result();
		$galleryIndexArray = $this->db->query("SELECT foreign_id FROM tbl_favorites WHERE table_name = 'gallery' AND user ='{$this->session->userdata('username')}'")->result();

		// get all the id's
		$strLibraryForeignIndex = $this->implodeArray($libraryIndexArray, ",");
		$strGalleryForeignIndex = $this->implodeArray($galleryIndexArray, ",");

		if(!empty($strLibraryForeignIndex)) {
			$libraryArray = $this->db->query("SELECT * FROM tbl_library WHERE id IN (" . $strLibraryForeignIndex . ") ")->result();
		}

		if(!empty($strGalleryForeignIndex)) {
			$galleryArray = $this->db->query("SELECT * FROM tbl_gallery WHERE id IN (" . $strGalleryForeignIndex . ") ")->result();
		}

		return $this->isFavorite(array_merge($galleryArray, $libraryArray));*/


		//get separately the table of library and gallery
		//then after getting the array combined the two array and return it as one array
		$libraryArray = array();
		$galleryArray = array();
		
		$libraryIndexArray = $this->db->query("SELECT foreign_id FROM tbl_favorites WHERE table_name = 'library' AND user ='{$this->session->userdata('username')}' ")->result();
		$galleryIndexArray = $this->db->query("SELECT foreign_id FROM tbl_favorites WHERE table_name = 'gallery' AND user ='{$this->session->userdata('username')}'")->result();

		// get all the id's
		$strLibraryForeignIndex = $this->implodeArray($libraryIndexArray, ",");
		$strGalleryForeignIndex = $this->implodeArray($galleryIndexArray, ",");

		if(!empty($strLibraryForeignIndex)) {
			$libraryArray = $this->db->query("SELECT * FROM tbl_avatars WHERE id IN (" . $strLibraryForeignIndex . ") AND type = 'library' ")->result();
		}

		if(!empty($strGalleryForeignIndex)) {
			$galleryArray = $this->db->query("SELECT * FROM tbl_avatars WHERE id IN (" . $strGalleryForeignIndex . ") AND type = 'gallery' ")->result();
		}

		return $this->isFavorite(array_merge($galleryArray, $libraryArray));
	}

	public function isFavorite($myTable) {
		$indexArray = array();
		$favoritesArray = $this->Favorites_model->getFavoritesByUser();

		foreach($favoritesArray as $favorites) {
			$x = 0;
			foreach ($myTable as $myTableValue) {

				$myTable[$x]->is_favorite = 0;

				if($favorites->foreign_id == $myTableValue->id) {
					array_push($indexArray, $x);
				}
				$x++;
			}
		}

		for($y = 0; $y < count($indexArray); $y++) {
			$myTable[$indexArray[$y]]->is_favorite = 1;
		}

		return $myTable;
	}

	public function implodeArray($array , $delimeters) {
		$arrayHolder = array();

		foreach($array as $values) {
			array_push($arrayHolder, $values->foreign_id);
		}

		return implode(",", $arrayHolder);
	}
	

}