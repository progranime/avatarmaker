<?php

class Search extends CI_Controller {

	public function __contructor () {
		parent::construct();
	}

	public function index () {
		$data["searchResults"] = $this->globalSearch();
		$this->load->view('search', $data);
	}
	
	public function globalSearch() {
		if ($this->input->post('search') !== null) {
			// getting the inputted value in search textbox
			$search = $this->input->post("search");
			// getting the results for library and gallery table
			$searchLibrary = $this->db->query("SELECT * FROM tbl_avatars WHERE (name LIKE '%$search%' OR description LIKE '%$search%') AND (type = 'library') ")->result();
			$searchGallery = $this->db->query("SELECT * FROM tbl_avatars WHERE (name LIKE '%$search%' OR description LIKE '%$search%') AND (type = 'gallery') ")->result();
			// merging the two table in one array to only have one json request
			$searchResults = array_merge($searchLibrary, $searchGallery);
			// returning whether the results is favorite or not
			
			return $this->isFavorite($searchResults);
		}
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