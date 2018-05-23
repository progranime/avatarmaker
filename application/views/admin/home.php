<!DOCTYPE html>
<html>
<head>
	<title>Avatar Maker</title>
	<meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" type="text/css" href="<?=base_url('public/dist/css/app.css');?>">
	<link rel="stylesheet" type="text/css" href="<?=base_url('public/dist/css/jquery.dataTables.css');?>">
	<link rel="stylesheet" type="text/css" href="<?=base_url('public/dist/css/admin.css');?>">
</head>
<body>

	<?php $this->load->view('admin/components/header'); ?>	

	<div class="container mt-4">
		
		<h1>Dashboard HomePage</h1>

		<ul class="nav nav-tabs" id="myTab" role="tablist">
			<li class="nav-item">
				<a class="nav-link active" id="home-tab" data-toggle="tab" href="#library">Library</a>
			</li>
			<li class="nav-item">
				<a class="nav-link" id="profile-tab" data-toggle="tab" href="#banners" >Banners</a>
			</li>
		</ul>
		<div class="tab-content" id="myTabContent">
			<div class="tab-pane fade " id="library" role="tabpanel" aria-labelledby="home-tab">
				<h2 class="mt-4">Library</h2>
				
				<table class="table table-responsive table-striped" id="library-table">
					<thead>
						<tr>
							<th>Name</th>
							<th>Description</th>
							<th>Image</th>
							<th>Gender</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
					<?php foreach($libraries as $library) { ?>
						<tr>
							<td><?=$library->name;?></td>
							<td><?=$library->description;?></td>
							<td><?=$library->image;?></td>
							<td><?=$library->gender;?></td>
							<td>
								<a href="<?=base_url('admin/library/update/') . $library->id ; ?>" class="btn btn-primary">Update</a>
								<a href="<?=base_url('admin/library/delete/') . $library->id ; ?>" class="btn btn-danger">Delete</a>
							</td>
						</tr>
					<?php } ?>
					</tbody>
				</table>

			</div>
			<div class="tab-pane fade show active" id="banners">
				<h2 class="mt-4">Banners</h2>

				<table class="table table-responsive table-striped" id="banners-table">
					<thead>
						<tr>
							<th>Name</th>
							<th>Banner Mobile</th>
							<th>Banner Tablet</th>
							<th>Banner Desktop</th>
							<th>Visibility</th>
							<th>Sort</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
					<?php foreach($banners as $banner) { ?>
						<tr>
							<td><?=$banner->name;?></td>
							<td><img src="<?=base_url('public/images/banners/') . $banner->banner_mobile;?>"></td>
							<td><img src="<?=base_url('public/images/banners/') . $banner->banner_tablet;?>"></td>
							<td><img src="<?=base_url('public/images/banners/') . $banner->banner_desktop;?>"></td>
							<td><?=$banner->visibility == 1 ? 'show' : 'hidden';?></td>
							<td><?=$banner->sort;?></td>
							<td>
								<!-- <a href="<?=base_url('admin/banner/update/') . $banner->id ; ?>" class="btn btn-primary">Update</a> -->
								<a href="<?=base_url('admin/banner/delete/') . $banner->id ; ?>" class="btn btn-danger">Delete</a>
							</td>
						</tr>
					<?php } ?>
					</tbody>
				</table>
			</div>
		</div>
		
		
		
	</div>
			


		


		<script type="text/javascript" src="<?=base_url('public/dist/js/app.js');?>"></script>
		<script type="text/javascript">
			$(document).ready( function () {
			    $('#library-table, #banners-table').DataTable();
			} );
		</script>


	</div>

</body>
</html>