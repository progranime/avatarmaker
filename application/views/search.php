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

	<div class="banner--container with-bg">
        <div class="banner--wrapper">
            <h1>Search Results</h1>
            <form action="<?=base_url('search');?>" method="post" id="searchForm" name="searchForm">
                <input type="text" name="search" placeholder="Search">
            </form>
        </div>
    </div>

	
	<div class="container">
		
		<div class="row my-2">
	        <?php if(!empty($searchResults)) { ?>
	        <div class="col-12 text-right">
	            <button class="btn-link btn-views border-right btn--flat" data-view="grid"><img src="<?=base_url('public/images/icons/gridview.png');?>" /></button>
	            	<button class="btn-link btn-views btn--flat" data-view="list"><img src="<?=base_url('public/images/icons/listview.png');?>" /></button>
	        </div>
	        <?php } ?>
	    </div>

	    <div class="row card-container pagination--container">
            <div class="col-12 pagination--lists p-0">
                
                    <?php if(!empty($searchResults)) { ?>
                        <?php foreach($searchResults as $result) { ?>
                        <div class="card">
                            <div class="card-header">
                                <span class="title"><?=$result->name;?> <a href="javascript:void(0)" data-toggle="popover" data-content="<?=$result->description;?>" data-placement="bottom" class="description" data-trigger="focus"><img src="<?=base_url('public/images/icons/info.png');?>" /></a></span>
                                
                                <div class="checkbox">
                                    <input type="checkbox" class="group-download" id="gd<?=$result->id;?>">
                                    <label for="gd<?=$result->id;?>"></label>
                                </div>
                                <?php if($this->session->userdata("name")) {?>
                                    <?php if(@$result->is_favorite) { ?>
                                        <i class="favorite glyphicon fa fa-star is-active" data-table="<?=$result->type;?>" data-id="<?=$result->id;?>"> </i>
                                    <?php } else { ?>
                                        <i class="favorite glyphicon fa fa-star" data-table="<?=$result->type;?>" data-id="<?=$result->id;?>"> </i>
                                    <?php } ?>
                                <?php } ?>
                            </div>
                            <div class="img-holder">
                                <?=$result->image;?>
                            </div>
                            <div class="title-lv"><?=$result->name;?>  <a href="#" data-toggle="popover" data-content="<?=$result->description;?>" data-placement="bottom"><img src="<?=base_url('public/images/icons/info.png');?>" /></a></div>
                            <!-- card menu -->
                            <div class="card-menu">
                                <div class="custom-select card-download-size">
                                    <label><img src="<?=base_url('public/images/icons/size-icon.png');?>" data-active="<?=base_url('public/images/icons/size-icon-black.png');?>" data-inactive="<?=base_url('public/images/icons/size-icon.png');?>"/> <span>Size</span></label>
                                    <div class="options">
                                        <div class="options-item" data-option="1">250 x 350</div>
                                        <div class="options-item" data-option="2">500 x 700</div>
                                        <div class="options-item" data-option="3">750 x 1050</div>
                                    </div>
                                </div>
                                <div class="custom-select card-download-type">
                                    <label><img src="<?=base_url('public/images/icons/download-icon.png');?>" data-active="<?=base_url('public/images/icons/download-icon-black.png');?>" data-inactive="<?=base_url('public/images/icons/download-icon.png');?>"/> <span>Download</span></label>
                                    <div class="options">
                                        <div class="options-item" data-option="PNG">PNG</div>
                                        <div class="options-item" data-option="JPG">JPG</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <?php } ?>

                    <?php } else { ?>
                          <h1 class="text-center">No Results Found</h1>
                    <?php } ?>
            </div>
            <div class="col-12 my-2 pagination--number"></div>
        </div>

        <?php if(!empty($searchResults)) { ?>
        <div class="row text-center my-2">
            <div class="col-12">
            	<a href="#" class="btn btn--standard btn-group-download is-disabled" data-toggle="modal" data-target="#group-download-modal" disabled>Group Download</a>
            </div>
        </div>
        <?php } ?>


	</div>



	<?php $this->load->view('components/group-download-modal'); ?>
	<?php $this->load->view('components/thumbnail-modal'); ?>

	<script type="text/javascript" src="<?=base_url('public/dist/js/app.js');?>"></script>


</body>
</html>