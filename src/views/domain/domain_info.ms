<div class="btn-breadcrumb">
    <a href="#/" ><i class="fa-home"></i><span class="sr-only">{{t 'home'}}</span></a>
    <a href="#/domains">{{t 'domains'}}</a>
    <a href="#/domains/{{name}}">{{name}}</a>
</div>

<div class="separator"></div>

<div class="panel panel-default">
  <div class="panel-heading">
    <h2 class="panel-title">
        <span class="fa-fw fa-globe"></span> {{name}}
    </h2>
  </div>
    <div class="panel-body">
        <div class="container">
            <p>{{t 'domain_visit_url' url}}</p>
            <a role="button" href="{{url}}" class="btn btn-success" target="_blank">
                <span class="fa-fw fa-external-link"></span> {{t 'domain_visit'}}
            </a>
        </div>
        <hr>
        <div class="container">
            <p>{{t 'domain_default_desc'}}</p>
            {{#if main}}
            <p class="alert alert-info">
                <span class="fa-star" title="{{t 'default'}}"></span> {{t 'domain_default_longdesc'}}
            </p>
            {{else}}
            <button class="btn btn-primary" data-action="set_default" data-domain="{{name}}">
                <span class="fa-fw fa-star"></span> {{t 'set_default'}}
            </button>
            {{/if}}
        </div>
        <hr>
        <div class="container">
            <p>{{t 'domain_dns_longdesc'}}</p>
            <a role="button" href="#/domains/{{name}}/dns"  class="btn btn-default slide">
                <span class="fa-fw fa-globe"></span> {{t 'domain_dns_config'}}
            </a>
        </div>
        <hr>
        <div class="container">
            <p>{{t 'certificate_manage'}}</p>
            <a href="#/domains/{{name}}/cert-management" role="button" class="btn btn-default slide">
                <span class="fa-fw fa-lock"></span> {{t 'ssl_certificate'}}
            </a>
        </div>
        <hr>
        <div class="container">
            <p>{{t 'domain_delete_longdesc' name}}</p>
            <button class="btn btn-danger" data-action="delete" data-domain="{{name}}">
                <span class="fa-fw fa-trash-o"></span> {{t 'delete'}}
            </button>
        </div>
    </div>
</div>
