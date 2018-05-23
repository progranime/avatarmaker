<!DOCTYPE html>
<html>
<head>
	<title>Avatar Maker</title>
	<meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" type="text/css" href="<?=base_url('public/dist/css/app.css');?>">
</head>
<body>
	
	<?php $this->load->view('components/header'); ?>
	
	<div class="banner--container">
        <div class="banner--wrapper">
            <div class="row" style="">
                <div class="col-12 text-center">
                    <h1 class="header">Welcome, <span class="text-capitalize"><?=$this->session->userdata('name');?></span>!</h1>
                    <p class="sub-header text-color--primary">Start creating your own Avatars</p>
                    <a href="<?=base_url('customize');?>" class="btn btn--standard">Create Your Own</a>
                </div>
            </div>
        </div>
    </div>


	<div class="container">

        <!-- this is either library / gallery favorites lists --> 
        <div class="row mar-no">
            <div class="col-4 text-left p-0 align-self-center">
                <h1 class="text--underline">My Favorites</h1>
            </div>

            <div class="col-8 text-right align-self-center">

                <select class="filter">
                    <option class="filter-option" value="all" data-search="getAllTable" >View All</option>
                    <option class="filter-option" value="favorites" data-search="getAllMyFavoritesInAllTable" >Your Favorites</option>
                    <option class="filter-option" value="gallery" data-search="getAllMyGallery" >My Avatars</option>
                    <option class="filter-option" value="male" data-search="getAllTableBasedOnGender" >Male</option>
                    <option class="filter-option" value="female" data-search="getAllTableBasedOnGender" >Female</option>
                </select>


                <button class="btn-link btn-views border-right btn--flat" data-view="grid"><img src="<?=base_url('public/images/icons/gridview.png');?>" /></button>
            	<button class="btn-link btn-views btn--flat" data-view="list"><img src="<?=base_url('public/images/icons/listview.png');?>" /></button>
            </div>
        </div>
        
		<div class="row card-container avatar-favorites pagination--container">
            <?php include 'templates/avatar-lists.html'; ?>
        </div>
		  
		<div class="row">
            <div class="col-12 p-0">
                <h1 class="text--underline">My Avatars</h1>
            </div>
        </div>
		<div class="row card-container avatar-gallery pagination--container">
            <?php include 'templates/avatar-lists.html'; ?>
        </div>


        <div class="my-2 text-center">
            <a href="#" class="btn btn--standard btn-group-download disabled" data-toggle="modal" data-target="#group-download-modal" disabled>Group Download</a>
        </div>
        
	</div>
	
	<?php $this->load->view('components/group-download-modal'); ?>
	<?php $this->load->view('components/thumbnail-modal'); ?>
	
	<script type="text/javascript" src="<?=base_url('public/dist/js/app.js');?>"></script>


</body>
</html>