options( digits = 16 )
library( jsonlite )

set.seed( 38 )

x = sample( seq( 1, 40, by = 0.25 ) )
s = sample( seq( 1, 40, by = 0.25 ) )
expected = pgamma( 1, s, x )

cat( expected, sep = ",\n" )

write( toJSON( x, digits = 16, auto_unbox = TRUE ), "./test/fixtures/x.json" )
write( toJSON( s, digits = 16, auto_unbox = TRUE ), "./test/fixtures/s.json" )
write( toJSON( expected, digits = 16, auto_unbox = TRUE ), "./test/fixtures/expected.json" )
