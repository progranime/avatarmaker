<?php

class Avatars_model extends CI_Model {
	
	public function __construct () {
		date_default_timezone_set('Asia/Manila');
	}

	// get
	public function getAllLibrary () {
		return $this->db->get_where("tbl_avatars", array("type" => "library"))->result();
	}

	public function getAllMyGallery () {
		// return $this->db->get_Where('tbl_gallery', array("user" => 'jeremy.espinosa'))->result();
		return $this->db->query("SELECT * FROM tbl_avatars
								WHERE user = '{$this->session->userdata('username')}'
								AND type = 'gallery'
								ORDER BY datetime_created DESC ")->result();

	}

	public function getLibrary () {
		$id = $this->uri->segment(4);
		return $this->db->get_where('tbl_avatars', array(
			"id" => $id,
			"type" => "library"
		))->result();
	}


	public function getAllLibraryBasedOnGender () {
		$gender = $this->input->get("value");
		return $this->db->get_where('tbl_avatars', array(
							"gender" => $gender,
							"type"	=> "library"
						))->result();
	}

	// add

	public function insertAvatar () {
		$name 			= $this->input->post('name');
		$description	= $this->input->post('description');
		$svg 			= $this->input->post('svg');
		$gender 		= $this->input->post('gender');

		// insert to the database all the inputs retrieve
		$this->db->insert('tbl_avatars', array(
			"name" => $name,
			"description" => $description,
			"image" => $svg,
			"gender" => $gender,
			"type" => "gallery",
			"user" => $this->session->userdata('username'),
			"datetime_created" => date("Y-m-d h:i:s")
		));

	}

	public function createLibrary () {
		$name 			= $this->input->post('name');
		$description 	= $this->input->post('description');
		$image 			= $this->input->post('image');
		$gender 		= $this->input->post('gender');
	
		$this->db->insert('tbl_avatars', array(
			"name" 				=> $name,
			"description" 		=> $description,
			"image" 			=> $image,
			"gender"			=> $gender,
			"type" 				=> "library",
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
		$this->db->where('type', 'library');
		$this->db->update('tbl_avatars', array(
			"name" 				=> $name,
			"description" 		=> $description,
			"image" 			=> $image,
			"gender"			=> $gender
		));

	}

	// delete

	public function deleteLibrary () {
		$id = $this->uri->segment(4);

		$this->db->delete('tbl_avatars', array(
			"id" => $id
		));

	}

}