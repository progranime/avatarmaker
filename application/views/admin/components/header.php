<nav class="navbar navbar-expand-lg navbar-light bg-light">
	<a class="navbar-brand" href="#">Dashboard</a>
	<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
		<span class="navbar-toggler-icon"></span>
	</button>
	<div class="collapse navbar-collapse" id="navbarNavAltMarkup">
		<div class="navbar-nav">
			<a class="nav-item nav-link <?=$this->uri->segment(2) === 'home' ? 'active' : '';?>" href="<?=base_url('admin/home');?>">Home</a>
			<a class="nav-item nav-link <?=$this->uri->segment(2) === 'library' ? 'active' : '';?>" href="<?=base_url('admin/library');?>">Library</a>
			<a class="nav-item nav-link <?=$this->uri->segment(2) === 'banner' ? 'active' : '';?>" href="<?=base_url('admin/banner');?>">Banner</a>
			<a href="<?=base_url('admin/user/logout');?>" class="nav-item nav-link">Logout</a>
		</div>
	</div>
</nav>