<?php

class Post extends CI_Controller {

	public function index () {

	}

	public function addRemoveFavorites () {
		
		$query = $this->Favorites_model->getFavorite(); // retrieving from favorites model the favorite of the user

		if (empty($query)) { // checking if there is a row retrieve
			$this->Favorites_model->insertFavorite(); // add the favorite from the database
		} else {
			$this->Favorites_model->deleteFavorite(); // delete the favorite from the database
		}

	}

	public function saveAvatar () {
		// $this->Gallery_model->insertAvatar();
		$this->Avatars_model->insertAvatar();
	}

}