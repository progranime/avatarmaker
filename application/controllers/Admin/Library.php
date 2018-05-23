<?php

class Library extends CI_Controller {

	public function index () {

		// check if there is a session for the user to login
		if ($this->session->has_userdata('admin_username')) {
			$this->load->view('admin/library/create');
		} else {
			$this->load->view('admin/login');
		}

	}

	public function create () {
		$this->Avatars_model->createLibrary();
		redirect('admin/home');
	}

	public function delete () {
		$this->Avatars_model->deleteLibrary();
		redirect('admin/home');
	}

	public function update () {
		// get the value based on ID
		$data['library'] = $this->Avatars_model->getLibrary();
		$this->load->view('admin/library/update', $data);
	}

	public function updateLibrary () {
		$this->Avatars_model->updateLibrary();
		redirect('admin/home');
	}

}
