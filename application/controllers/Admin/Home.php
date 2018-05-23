<?php 

class Home extends CI_Controller {

	public function index () {

		// check if there is a session for the user to login
		if ($this->session->has_userdata('admin_username')) {
			// get all the avatar library
			$data["libraries"] 	= $this->Avatars_model->getAllLibrary();
			$data["banners"] 	= $this->Banners_model->getAllBanners();
			
			$this->load->view('admin/home', $data);
		} else {
			$this->load->view('admin/login');
		}
		

	}



}