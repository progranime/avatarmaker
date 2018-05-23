<?php

class User extends CI_Controller {


	public function login () {

		$email = $this->input->post('email');
		$password = $this->input->post('password');
		$url = "http://10.124.8.92:8080/dbusinesscard/rest/user/card";


		$curl = curl_init();
		curl_setopt_array($curl, array(
			CURLOPT_PORT => "8080",
			CURLOPT_URL => $url,
			CURLOPT_RETURNTRANSFER => true,
			CURLOPT_ENCODING => "",
			CURLOPT_MAXREDIRS => 10,
			CURLOPT_TIMEOUT => 30,
			CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
			CURLOPT_CUSTOMREQUEST => "POST",
			CURLOPT_POSTFIELDS => "{\n\t\"name\":\"" . $email . "\",\n\t\"pwd\":\"" . $password . "\"\n}",
			CURLOPT_HTTPHEADER => array(
				"accept: application/json",
				"cache-control: no-cache",
				"content-type: application/json"
			),
		));

		$response = curl_exec($curl);
		$err = curl_error($curl);

		curl_close($curl);

		$result = trim($response);

		// echo $result;

		if ($err || $result == FALSE || empty($result)) {
			// ERROR CURL
			echo $error_response;
		} else {

			$login_details = json_decode($result);
			$email = $login_details -> { 'email' };
			$id = $login_details -> { 'id' };
			$name = $login_details -> { 'name' };

			if(!(empty($email) || empty($id))) {
				$data = array(
					"name"		=> $this->getName($id),
					"username" 	=> $id,
					"logged_in" => true
				);
				$this->session->set_userdata($data);
				redirect('/home');	
			} else {
				echo "<script>alert('Please try again');</script>";
				redirect('/home');
			}

		}

	}

	public function logout() {
		// $this->session->unset_userdata("username");
		$this->session->sess_destroy();
		redirect('/home');	
	}

	public function getName($username) {
		$name = explode(".", $username);
		return $name[0];
	}


}