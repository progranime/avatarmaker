<?php

class Avatars extends CI_Controller {

	public function index () {
		if ($this->session->has_userdata('username')) {
			$this->load->view('avatars');
		} else {
			redirect('home');
		}
		
	}

}
