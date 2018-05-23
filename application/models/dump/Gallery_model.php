<?php

class Gallery_model extends CI_model {

	public function __construct () {
		date_default_timezone_set('Asia/Manila');
	}

	public function getAllMyGallery () {
		// return $this->db->get_Where('tbl_gallery', array("user" => 'jeremy.espinosa'))->result();
		return $this->db->query("SELECT * FROM tbl_gallery
								WHERE user = '{$this->session->userdata('username')}'
								ORDER BY datetime_created DESC ")->result();

	}

	public function insertAvatar () {
		$name 			= $this->input->post('name');
		$description	= $this->input->post('description');
		$svg 			= $this->input->post('svg');
		$gender 		= $this->input->post('gender');

		// insert to the database all the inputs retrieve
		$this->db->insert('tbl_gallery', array(
			"name" => $name,
			"description" => $description,
			"image" => $svg,
			"gender" => $gender,
			"table_name" => "gallery",
			"user" => $this->session->userdata('username'),
			"datetime_created" => date("Y-m-d h:i:s")
		));

	}

}