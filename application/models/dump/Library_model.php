<?php

class Library_model extends CI_Model {

	// select = get
	// delete = del
	// update = set

	public function __construct () {
		date_default_timezone_set('Asia/Manila');
	}
	
	// get

	public function getAllLibrary () {
		return $this->db->get("tbl_library")->result();
	}

	public function getLibrary () {
		$id = $this->uri->segment(4);
		return $this->db->get_where('tbl_library', array(
			"id" => $id
		))->result();
	}

	public function getInForeignId ($foreignId) {
		return $this->db->query("SELECT * FROM tbl_library
				WHERE id IN (". $foreignId .") AND table_name = 'library' ")->result();
	}

	public function getAllLibraryBasedOnGender () {
		$gender = $this->input->get("value");
		return $this->db->get_where('tbl_library', array(
							"gender" => $gender
						))->result();
	}

	// add

	public function createLibrary () {
		$name 			= $this->input->post('name');
		$description 	= $this->input->post('description');
		$image 			= $this->input->post('image');
		$gender 		= $this->input->post('gender');
	
		$this->db->insert('tbl_library', array(
			"name" 				=> $name,
			"description" 		=> $description,
			"image" 			=> $image,
			"gender"			=> $gender,
			"table_name" 		=> "library",
			"user" 				=> "admin",
			"datetime_created" 	=> date("Y-m-d h:i:s")
		));
	}

	// update

	public function updateLibrary () {
		$id 			= $this->input->post('id');
		$name 			= $this->input->post('name');
		$description 	= $this->input->post('description');
		$image 			= $this->input->post('image');
		$gender 		= $this->input->post('gender');

		$this->db->where('id', $id);
		$this->db->update('tbl_library', array(
			"name" 				=> $name,
			"description" 		=> $description,
			"image" 			=> $image,
			"gender"			=> $gender
		));

	}

	// delete

	public function deleteLibrary () {
		$id = $this->uri->segment(4);

		$this->db->delete('tbl_library', array(
			"id" => $id
		));

	}

}