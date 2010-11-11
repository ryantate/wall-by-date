#!/usr/bin/perl

use strict;
use warnings;

use URI::Escape;

my $file = shift or die "Usage: perl generate_bookmarklet.pl JSFILE\n";
my ($js, $fh);
open($fh, '<', $file) or die "Could not open $file for reading: $!";
$js .= $_ while <$fh>;
close $fh;
$js =~ s/^\s+//;
$js =~ s/\s+$//;
$js = uri_escape($js);

$file =~ s/\.js$//i;
my $bookmarklet_file = "$file.bookmarklet";
open($fh, '>', $bookmarklet_file) or die "Could not open $bookmarklet_file for writing: $!";
print $fh $js;
close $fh;

