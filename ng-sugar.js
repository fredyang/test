(function( ng ) {
  "use strict";

	window.ng = ng;
	var moduleTypes = {
		config: true,
		constant: true,
		controller: true,
		directive: true,
		factory: true,
		filter: true,
		provider: true,
		run: true,
		service: true,
		value: true,
		requires: true
	};

	$.extend( ng, {
		/* a module is like
		 * {
		 *   constant: { },
		 *
		 *
		 * }
		 * */
		//ng.m(name, requires, module)
		//ng.m(name, module)
		m: function( name, requires, module ) {

			if (!ng.isArray( requires )) {
				module = requires;
				requires = [];
			}

			var mod;

			try {
				mod = ng.module( name );
			} catch (e) {
				mod = ng.module( name, requires );
			}

			for (var type in module) {
				if (type in moduleTypes) {
					mod[type]( module[type] );
				}
			}

			return mod;
		}
	} );

	ng.module( "ng" ).directive( "ngCode", function() {
		return function( scope, elem, attrs ) {
			var method = attrs.ngCode || "code";
			scope[method]( elem, attrs );
		};
	} );

	ng.m( "ng" ).run( function( $rootScope ) {
		$rootScope.extend = function( scope ) {
			ng.extend( this, scope );
			return this;
		};
	} );


})( angular );
