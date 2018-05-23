<?php

class Favorites_model extends CI_Model {

	// add
	// delete
	// update

	public function __construct () {
		date_default_timezone_set('Asia/Manila');
	}

	public function index () {

	}

	// get

	public function getFavorite () {
		$id = $this->input->post('id', TRUE);
		$table = $this->input->post('table', TRUE);

		return $this->db->query("SELECT * FROM tbl_favorites 
				WHERE (user = '{$this->session->userdata('username')}') AND foreign_id = '$id'
				AND   (table_name = '$table') ")->result();
	}

	public function getForeignIdOfUser () {
		return $this->db->query("SELECT foreign_id FROM tbl_favorites
				WHERE user = '{$this->session->userdata('username')}' ")->result();
	}

	public function getFavoritesByUser () {
		return $this->db->query("SELECT * FROM tbl_favorites WHERE user = '{$this->session->userdata('username')}' ")->result();
	}


	// insert

	public function insertFavorite () {

		$id = $this->input->post('id', TRUE);
		$table = $this->input->post('table', TRUE);

		$this->db->insert('tbl_favorites', array(
			"foreign_id" 	=> $id,
			"table_name" 	=> $table,
			"user" 			=> $this->session->userdata('username'),
			"datetime_created" 	=> date("Y-m-d h:i:s")
		));
	}

	// delete

	public function deleteFavorite () {
		$id = $this->input->post('id', TRUE);

		$this->db->where('user', $this->session->userdata('username'))
				->where('foreign_id', $id)
				->delete('tbl_favorites');
	}




}