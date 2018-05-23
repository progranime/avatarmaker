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

	<!-- Carousel -->

	<div class="carousel slide" data-ride="carousel">
		<div class="carousel-inner">
			<?php $inc = 0; ?>
			<?php foreach ($getAllBanners as $banner) { ?>
				<?php 
					$root = "public/images/banners/"; // destination folder of the banners
					$src = $root . $banner->banner_mobile . "," . $root . $banner->banner_tablet . "," . $root . $banner->banner_desktop; // link of all banners (mobile, tablet and desktop)
				?>
				<div class="carousel-item <?=$inc == 0 ? 'active' : '' ;?>">
					<div class="bg-switcher" data-bg="<?=$src?>"></div>
	                <div class="carousel-caption"></div>
				</div>

				<?php $inc++; ?>
			<?php } ?>
		</div>
	</div>
	
	<div class="container">
		<!-- List of Avatar Library -->
		<div class="row my-4">
			<div class="col-4 p-0">
				 <a href="<?=base_url('/customize');?>" class="btn btn--standard">Create Your Own</a>
			</div>
			<div class="col-8 text-right p-0">
				<select class="filter">
                    <option class="filter-option" value="all" data-search="getAllLibrary">View All</option>
                    <?php if ($this->session->has_userdata('username')) { ?>
						<option class="filter-option" value="favorites" data-search="getMyFavoritesInLibrary">Your Favorites</option>
                    <?php } ?>
                    <option class="filter-option" value="male" data-search="getAllLibraryBasedOnGender">Male</option>
                    <option class="filter-option" value="female" data-search="getAllLibraryBasedOnGender">Female</option>
                </select>

                <button class="btn-link btn-views border-right btn--flat" data-view="grid"><img src="<?=base_url('public/images/icons/gridview.png');?>" /></button>
                <button class="btn-link btn-views btn--flat" data-view="list"><img src="<?=base_url('public/images/icons/listview.png');?>" /></button>
			</div>
		</div>

		<div class="row card-container avatar-library pagination--container">
            <?php $this->load->view('templates/avatar-lists.html'); ?>
        </div>

        <div class="text-center mt-3">
            <a href="#" class="btn btn--standard btn-group-download disabled" 
            	data-toggle="modal" data-target="#group-download-modal">Group Download</a>
        </div>
		

	</div>

	<?php $this->load->view('components/group-download-modal'); ?>
	<?php $this->load->view('components/thumbnail-modal'); ?>

	<script type="text/javascript" src="<?=base_url('public/dist/js/app.js');?>"></script>


</body>
</html>