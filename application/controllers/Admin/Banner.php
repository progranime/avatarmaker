<?php

class Banner extends CI_Controller {

	public function index () {

		// check if there is a session for the user to login
		if ($this->session->has_userdata('admin_username')) {
			$this->load->view('admin/banner/create');
		} else {
			// $this->load->view('admin/login');
			redirect('admin/user');
		}

		/*if (!$this->session->has_userdata("username")) {
			redirect('admin/user');
		}

		$this->load->view('admin/banner/create');*/
	}

	public function create () {
		// $this->load->view('admin/home');
		$this->Banners_model->createBanner();
		redirect('admin/home');
	}

	public function delete () {
		$this->Banners_model->deleteBanner();
		redirect('admin/home');
	}

	public function update () {
		$this->Banners_model->updateBanner();
		$this->load->view('admin/banner/update');
	}

}