@extends('layouts.app')

@section('content')
<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header text-center">{{ __('Dashboard') }}</div>
                <p class="text-center">{{ __('You are logged in!') }}</p>
                <div class="card-body">
                    @if (session('status'))
                    <div class="alert alert-success" role="alert">
                        {{ session('status') }}
                    </div>
                    @endif
                    <div id="root"></div>


                </div>
            </div>
        </div>
    </div>
</div>
@endsection
